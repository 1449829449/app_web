import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vhCheck from 'vh-check'
import './libs/addVant'
import './icons'
import 'amfe-flexible'
import Directives from './libs/directives'
require('../mock')
Vue.use(Directives)

vhCheck('browser-address-bar')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
