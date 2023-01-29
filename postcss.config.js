const pxtorem = require('postcss-pxtorem')
// 引入插件
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    // flexible配置
    pxtorem({
      // vant是按照375设计的,项目是按照750设计的,需要判断一下
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    }),
    // 去除没有用到的css
    purgecss({
      content: ['./public/**/*.html', './src/**/*.vue', './src/**/*.js'], // 需要分析的内容
      defaultExtractor (content) { // 分析style内联样式
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
      },
      safelist: [/^van/] // 指明哪些选择器可以安全地被保留在最终的 CSS 中
    })
  ]
}
