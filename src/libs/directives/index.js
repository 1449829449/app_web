// 多模块引入简写、
const ms = require.context('./global', false, /\.js$/)
const modules = {}

ms.keys().forEach((k) => {
  const n = k.substring(2, k.length - 3)
  modules[n] = ms(k).default
})

export default {
  install (Vue) {
    Object.keys(modules).forEach((key) => {
      Vue.directive(key, modules[key])
    })
  }
}
