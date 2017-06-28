/**
 * 生成一个 server-bundle.json 供 renderer 使用。
 */
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const srcPath = path.resolve(__dirname, '../src')

module.exports = merge(baseConfig, {
  entry: './src/entry-server.js',

  target: 'node',

  devtool: 'source-map',

  output: {
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /\.css$/
  }),

  plugins: [
    new VueSSRServerPlugin()
  ]
})
