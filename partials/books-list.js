const html = require('choo/html')
const BookItem = require('./book-item')

module.exports = function BooksList (books, emit) {
  return html`
    <main 
      role="main" 
      class="pl0 mt0 measure-wide center">
      ${title(books)}
      <ul 
        class="list pl0" 
        aria-live="polite">
        ${books.items.map(book => BookItem(book, emit))}
      </ul>
    </main>
  `
}

function title (books) {
  if (books.items.length) {
    return html`<h1 class="measure">Search Results</h1>`
  }
  return ''
}
