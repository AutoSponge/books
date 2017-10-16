const css = require('sheetify')
const choo = require('choo')
const mainView = require('./views/main')
const booksStore = require('./stores/books')

css('tachyons')

var app = choo()
app.use(booksStore)
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
} else {
  // app.use(require('choo-service-worker')())
}

app.route('/*', mainView)

if (!module.parent) app.mount('body')
else module.exports = app
