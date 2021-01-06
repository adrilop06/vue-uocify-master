//const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  },
  pwa: {
    name: 'Uoccify',
    themeColor: '#73EDFF',
    msTileColor: '#222222',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    devServer: { 
      https: true,
       proxy: 'https://api.deezer.com',
    
     }, 
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {  
      swSrc: 'src/service-worker.js',
    },
    iconPaths:{
      favicon32: 'public/img/icons/favicon-32x32.png',
      favicon16: 'public/img/icons/favicon-16x16.png',
      appleTouchIcon: 'public/img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'public/img/icons/mstile-150x150.png',
      msTileImage: 'public/img/icons/msapplication-icon-144x144.png'
    },
   
    
  }
  
};