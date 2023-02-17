// vue.config.js
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
const CompressionPlugin = require('compression-webpack-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
const vConsolePlugin = require('vconsole-webpack-plugin')

// 那些资源不打包
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex'
}
// CDN资源
const cdn = {
  js: [
    // vue
    '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
    // vue-router
    '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
    // vuex
    '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js'
  ]
}

module.exports = {
  publicPath: process.env.VUE_APP_ENV === 'prod' ? 'CDN' : '', // 打包路径
  parallel: false,
  productionSourceMap: process.env.VUE_APP_ENV !== 'prod', // 是否关闭map（可查看源码）
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
      .use('svgo-loader')
      .loader('svgo-loader')
      .end()
    // zip 压缩
    config.when(process.env.VUE_APP_ENV === 'prod', () => {
      config.plugin('CompressionPlugin').use(CompressionPlugin, [{ deleteOriginalAssets: true }])
    })
    // 图片压缩
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
    // 测试环境开启调试
    config.when(process.env.VUE_APP_ENV !== 'prod', (config) => {
      config.plugin('vConsole').use(vConsolePlugin, [{ filter: [], enable: true }])
    })
    // 包分析工具
    if (process.env.use_analyzer) {
      config.plugin('webpack-bundle-analyzer').use(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
        openAnalyzer: false // 在默认浏览器中是否自动打开报告，默认 true
      }))
    }
    // CDN引入
    config.externals(externals)
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
