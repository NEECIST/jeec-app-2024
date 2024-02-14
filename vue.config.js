const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";
        `
        // @import "@/scss/_mixins.scss"; 
      }
    }
  },

  pwa: {
    themeColor: "#1f1f1f",
    msTileColor: "#1f1f1f",
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  }
})
