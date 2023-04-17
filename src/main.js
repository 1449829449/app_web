import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vhCheck from "vh-check";
import "./libs/addVant";
import "./icons";
import "amfe-flexible";
import Directives from "./libs/directives";

import * as fundebug from "fundebug-javascript";
import FundebugVue from "fundebug-vue"; // Vue 2.x

// ◆导入
import * as filters from "./libs/filter";

process.env.VUE_APP_ENV !== "prod" && require("../mock");
fundebug.apikey =
  "59c8f859e906df92228c9b7b87712a7edd953013b65e06a45830bce05b911c4d";
new FundebugVue(fundebug).installVueErrorHandler(Vue);
// ◆循环注册过滤器里面的函数
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(Directives);

vhCheck("browser-address-bar");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
