const dlv = require('dlv')

module.exports = function booksStore (state, emitter) {
  init()

  if (!state.books) {
    resetBooks()
  }

  emitter.on('books:search', search)

  emitter.on('DOMContentLoaded', function () {
    emitter.on('books:update', update)
  })

  function init () {
    state.maxResults = 10
    state.searchTerm = ''
    state.searching = false
    state.searchStart = null
    state.searchEnd = null
    state.page = null
    state.maxAttribution = 0
    state.mostAttributed = null
    state.newest = null
    state.oldest = null
  }

  function resetBooks () {
    state.books = {}
    state.books.items = []
    state.books.totalItems = 0
    state.freqentAuthor = ''
  }

  function search ({term, page, searching}) {
    resetBooks()
    state.page = page
    state.searchTerm = term
    state.searching = searching
    state.searchStart = window.performance.now()
    emitter.emit('render')
  }

  function update (books) {
    state.books = books
    state.searching = false
    state.searchEnd = window.performance.now()
    state.maxAttribution = 0
    state.mostAttributed = null
    state.newest = new Date(-8640000000000000)
    state.oldest = new Date()
    state.stats = books.items.reduce((stats, book) => {
      dlv(book, 'volumeInfo.authors', []).forEach(author => {
        stats[author] = (author in stats) ? stats[author] += 1 : 1
        if (stats[author] > state.maxAttribution) {
          state.maxAttribution = stats[author]
          state.mostAttributed = author
        }
      })
      const published = dlv(book, 'volumeInfo.publishedDate')
      if (published) {
        const date = new Date(published)
        state.newest = Math.max(date, state.newest)
        state.oldest = Math.min(date, state.oldest)
      }
      return stats
    }, {})
    emitter.emit('render')
  }
}
