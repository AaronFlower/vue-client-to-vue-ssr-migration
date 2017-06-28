const fs = require('fs')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const template = fs.readFileSync('./src/index.template.html', 'utf-8')
let setupServer = require('./build/setup-server.js')
let readyPromise = setupServer()

const app = express()
app.get('*', (req, res) => {
  let context = {
    title: 'vue-webpack-ssr'
  }
  readyPromise.then(serverBundle => {
    createBundleRenderer(serverBundle, {
      runInNewContext: false,
      template
    }).renderToString(context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error!')
        }
      } else {
        res.end(html)
      }
    })
  })
})
app.listen(8087, () => {
  console.log('The server is listen at: http://localhost:8087')
})
