const html = require('choo/html')
const window = require('global/window')
const dlv = require('dlv')
const { search } = require('../services/books')
const BooksList = require('../partials/books-list')
const Pagination = require('../partials/pagination')
const Stats = require('../partials/stats')

const TITLE = 'Search Books'

module.exports = function mainView (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  const term = dlv(window, 'location.search', '').replace(/^\?search=/, '')
  const page = Number(dlv(window, 'location.hash', '').replace(/^#page-/, ''))
  const termChanged = term !== state.searchTerm
  const pageChanged = page !== state.page
  if (term && !state.searching && (termChanged || pageChanged)) {
    const searching = search({
      term,
      page,
      pageSize: state.maxResults
    }).then(books => emit('books:update', books))
    emit('books:search', { term, page, searching })
  }
  return html`
    <body class="sans-serif">
      <form 
        class="bg-light-blue mw7 center pa4 br2-ns ba b--black-10"
        onsubmit=${handleSubmit}>
        <fieldset class="cf bn ma0 pa0">
          <legend class="pa0 f5 f4-ns mb3 black-80">Find books using Google</legend>
          <div role="search">
            <label class="clip" for="search">Search Books</label>
            <input 
              autofocus
              id="search"
              type="search" 
              name="search"
              class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
              placeholder="title, author, or keywords"
              value="${decodeURIComponent(state.searchTerm)}">
            <button 
              type="submit"
              class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns">
              <span>Search</span>
            </button>
          </div>
        </fieldset>
        ${Stats(state)}
      </form>
      ${BooksList(state.books, emit)}
      ${Pagination(state, emit)}
    </body>
  `
  function handleSubmit (event) {
    event.preventDefault()
    const term = event.target.elements.search.value
    emit(state.events.PUSHSTATE, `/?search=${encodeURIComponent(term)}`)
  }
}
