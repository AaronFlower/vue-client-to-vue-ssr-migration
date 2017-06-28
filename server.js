const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const express = require('express')

const serverBundle = JSON.parse(fs.readFileSync('./dist/vue-ssr-server-bundle.json'))
const template = fs.readFileSync('./src/index.template.html', 'utf-8')
const renderer = createBundleRenderer(
  JSON.parse(fs.readFileSync('./dist/vue-ssr-server-bundle.json'), 'utf-8'), {
    runInNewContext: false,
    template
  }
)

const app = express()
app.get('*', (req, res) => {
  let context = {
    title: 'vue-webpack-ssr'
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error!')
      }
    } else {
      console.log(html)
      res.end(html)
    }
  })
})
app.listen(8087, () => {
  console.log('The server is listen at: http://localhost:8087')
})
