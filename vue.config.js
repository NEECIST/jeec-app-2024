const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    themeColor: "#1f1f1f",
    msTileColor: "#1f1f1f",
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  }
})
