const html = require('choo/html')

module.exports = function Stats (state) {
  if (state.searching) {
    return html`<p>searching for "${decodeURIComponent(state.searchTerm)}"${state.page ? `page ${state.page}` : ''}\u2026</p>`
  }
  if (state.searchEnd !== null) {
    const time = (state.searchEnd - state.searchStart) / 1000
    const oldest = new Date(state.oldest)
    const newest = new Date(state.newest)
    return html`<ul>
      <li>
        found ${state.books.totalItems} results for "${decodeURIComponent(state.searchTerm)}" in ${time.toPrecision(3)} seconds
      </li>
      <li>
        publish dates range from ${abbr(oldest)} to ${abbr(newest)}
      </li>
      <li>
        the most frequent author is ${state.mostAttributed} (${state.maxAttribution})
      </li>
    </ul>`
  }
  return html`<p class="h1"></p>`
}

function abbr (date) {
  return html`<abbr title="${date.toISOString()}">${date.toUTCString().replace(/(\S+), (\S+) (\S+) (\S+).+/, '$3 $4')}</abbr>`
}