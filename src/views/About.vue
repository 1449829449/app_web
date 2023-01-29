<template>
  <div class="about">
    <h1>This is an about page</h1>
    <svg-icon icon-class="jinxingzhong"></svg-icon>
    <div class="login-btn" v-permission="false">3333333</div>
    <img v-iurl="'tb-banner.png'" />

  </div>
</template>
<script>
// import { queryNotice } from '../api/login'
import iurl from '@/libs/directives/local/iurl'
export default ({
  directives: {
    iurl
  },
  data () {
    return {}
  },
  mounted () {
    console.log('11')
  }
})
</script>
<style lang="less" scoped>
.sfdsf{
  width: 100px;
  height: 100px;
}
</style>
