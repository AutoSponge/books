const window = require('global/window')
const { status, json, handleError } = require('./utils')

exports.search = function searchBooks ({ term = '', page = 0, pageSize = 10 }) {
  const startIndex = page * pageSize
  return window.fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${term}&projection=lite&printType=books&startIndex=${startIndex}&maxResults=${pageSize}`,
    {
      cache: 'force-cache'
    }
  )
    .then(status)
    .then(json)
    .catch(handleError)
}
