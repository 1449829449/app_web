const pxtorem = require('postcss-pxtorem')

module.exports = {
  plugins: [
    // flexible配置
    pxtorem({
      // vant是按照375设计的,项目是按照750设计的,需要判断一下
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    })
  ]
}
