const html = require('choo/html')
const dlv = require('dlv')
const he = require('he')
const VOLUME_INFO = 'volumeInfo'

module.exports = function BookItem (book = {}, emit) {
  const authors = dlv(book, [VOLUME_INFO, 'authors'], [])
  const title = dlv(book, [VOLUME_INFO, 'title'], '')
  const description =
    dlv(book, [VOLUME_INFO, 'description']) ||
    dlv(book, 'searchInfo.textSnippet') ||
    dlv(book, [VOLUME_INFO, 'subtitle']) ||
    'Description not available.'
  return html`
    <li id=${book.id} 
      itemscope itemtype="http://schema.org/Book" itemid="${book.selfLink}"
      class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
      <details>
        <summary>
          <span itemprop="author">${authors.join(', ')}</span> - <span itemprop="name">${title}</span>
        </summary>
        <p itemprop="description">${he.decode(description)}</p>
      </details>
    </li>
  `
}
