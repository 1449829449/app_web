import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 多模块引入简写
const ms = require.context('./modules', false, /\.js$/)
const modules = {}

ms.keys().forEach((k) => {
  const n = k.substring(2, k.length - 3)
  modules[n] = ms(k).default
})

export default new Vuex.Store({
  modules
})
