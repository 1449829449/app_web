// vue.config.js
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: process.env.VUE_APP_ENV === 'prod' ? '' : '', // 打包路径
  parallel: false,
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_BASE_HTTP, // 后台接口域名
        ws: true, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true // 是否跨域
        // pathRewrite: {
        //   "^/hmb-admin-base": "/hmb-admin-base",
        // },
      }
    }
  },
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
  },
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({ /* options */ })
    ]
  },
  chainWebpack: (config) => {
    // vue.config.js svg 图标进行自动注册
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      }).end()
      // zip 压缩
    config.when(process.env.VUE_APP_ENV === 'prod', () => {
      config.plugin('CompressionPlugin').use(CompressionPlugin, [{ deleteOriginalAssets: true }])
    })
  }
}
