const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const webpackServerConfig = require('./webpack.server-bundle.conf.js')

module.exports = function setupServer (app, cb) {
  const mfs = new MFS()
  return new Promise((resolve, reject) => {
    const serverCompiler = webpack(webpackServerConfig)
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch(
      {
        aggregateTimeout: 300,
        poll: 1000
      },
      (err, stats) => {
        console.log('serverCompiler watched ....')
        if (err) {
          throw err
          console.log(err)
        }
        stats = stats.toJson()
        if (stats.errors.length) {
          return
        }
        let serverBundleJson
        try {
          serverBundleJson =  JSON.parse(mfs.readFileSync(webpackServerConfig.output.path + '/vue-ssr-server-bundle.json', 'utf-8'))
        } catch (e) {
          console.log(e)
        }
        resolve(serverBundleJson)
      }
    )
  })
}
