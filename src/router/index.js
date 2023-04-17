import Vue from "vue";
import VueRouter from "vue-router";
import getPageTitle from "@/libs/get-page-title";

// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// permissions
import store from "@/store";
import storage from "store";

// 模块引入
/* Router Modules */
const ms = require.context("./modules", false, /\.js$/);
const routes = ms
  .keys()
  .map((item) => ms(item).default || [])
  .flat(2);

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start();
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 是否存有token作为验证是否登录的条件
    const token = storage.get("ACCESS_TOKEN");
    if (token && token !== "undefined") {
      // 是否处于登录页面
      if (to.path === "/user/login") {
        next({ path: "/home" });
        // 查询是否储存用户信息
      } else if (Object.keys(store.state.system.user.info).length === 0) {
        store.dispatch("system/user/getInfo").then(() => {
          next();
        });
      } else {
        next();
      }
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      });
      NProgress.done();
    }
  } else {
    // 不需要身份校验 直接通过
    next();
  }
});

router.afterEach((to) => {
  // 进度条
  NProgress.done();
  // 设置浏览器标题
  document.title = getPageTitle(to.meta.title);
});

// 解决重复点击路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 解决重复点击路由报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

export default router;
