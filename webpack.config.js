'use strict';


const webpack = require('webpack')

module.exports = {
  entry: './app',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {  presets: ['react', 'es2015'] }
        }]
      }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
}
