const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://test.matchlink.shop',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
})