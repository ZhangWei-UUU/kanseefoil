/* eslint-disable */
const webpack = require('webpack');

const withCSS = require('@zeit/next-css')
if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}
  
module.exports = withCSS({
    webpack(config, options) {
      return config
    }
  })


