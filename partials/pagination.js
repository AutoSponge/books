const html = require('choo/html')
const dlv = require('dlv')
const window = require('global/window')
const base = 'f5 no-underline bg-animate pa3 ba'

module.exports = function Pagination (state, emit) {
  const totalPages = state.books.totalItems / state.maxResults
  const currentPage = state.page
  const pages = Array.apply(null, { length: totalPages }).map(
    Function.call,
    Number
  )
  const start = Math.max(currentPage - 4, 0)
  const end = Math.max(currentPage + 4, 8)
  const search = dlv(window, 'location.search', '')
  return html`<nav 
      role="navigation" 
      class="flex items-center justify-center pa4"
      aria-label="Pagination Navigation">
    <ul class="pa0">
      ${arrowLeft()}
      ${pages.slice(start, end).map(p => {
        if (p === currentPage) {
          return html`<li class="inline-flex items-center">
            <a 
              href="/${search}#page-${p}"
              class="${base} bg-near-black border-box white" 
              aria-label="Current Page, Page ${p}" 
              aria-current="true">${p}</a>
          </li>`
        }
        return html`<li class="inline-flex items-center">
          <a 
            class="${base} hover-bg-black hover-white border-box black" 
            aria-label="Go to Page ${p}" 
            href="/${search}#page-${p}">${p}</a>
          </li>`
      })}
      ${arrowRight()}
    </ul>
  </nav>`

  function arrowLeft () {
    if (state.searching || !currentPage || currentPage - 4 < 0) {
      return html`<li class="inline-flex items-center"></li>`
    }
    const previous = currentPage - 8 < 0 ? currentPage - 4 : currentPage - 8
    return html`<li class="inline-flex items-center">
      <a 
        aria-label="Go to page ${previous}" href="/${search}#page-${previous}" class="f5 no-underline black bg-animate hover-bg-black hover-white pa3 ba border-box">        
        <span role="presentation">\u2039</span>
        <span class="pl1">Previous</span>
      </a>
    </li>`
  }

  function arrowRight () {
    if (end >= totalPages) {
      return html`<li class="inline-flex items-center"></li>`
    }
    const next = Math.min(currentPage + 8, totalPages)
    return html`<li class="inline-flex items-center">
      <a
        aria-label="Go to page ${next}" 
        href="/${search}#page-${next}" class="f5 no-underline black bg-animate hover-bg-black hover-white pa3 ba border-box">
        <span class="pr1">Next</span>
        <span role="presentation">\u203A</span>
      </a>
    </li>`
  }
}
