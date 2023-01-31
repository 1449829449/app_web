// 存放需要登录或权限认证的路由
export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      auth: false
    }
  }
]
