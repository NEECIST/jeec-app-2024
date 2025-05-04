const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    themeColor: "#1f1f1f",
    msTileColor: "#1f1f1f",
    iconPaths: {
      faviconSVG: "favicon.ico",
      favicon16: 'img/icons/favicon-16x16.png',
      favicon32: 'img/icons/favicon-32x32.png',
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  }
})
