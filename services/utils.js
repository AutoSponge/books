exports.status = function (response) {
  if (response.status > 399) {
    throw new Error(`${response.status}: response from service.`)
  }
  return response
}
exports.json = response => response.json()
exports.handlError = error => console.error(error)
