const { defineConfig } = require('@vue/cli-service')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new MomentLocalesPlugin({
          localesToKeep: []
      }),
    ]
  }
})
