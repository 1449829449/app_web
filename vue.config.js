// vue.config.js
const path = require('path')
module.exports = {
  publicPath: process.env.VUE_APP_ENV === 'prod' ? 'CDN' : '', // 打包路径
  // less 写法
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 引入全局less文件
      patterns: [path.resolve(__dirname, './src/styles/global.less')]
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 注意：这里没有lessOptions
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            './src/styles/vantcss.less'
          )}";`
        }
      }
    }
  }
}
