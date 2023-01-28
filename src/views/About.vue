<template>
  <div class="about">
    <h1>This is an about page</h1>
    <svg-icon icon-class="jinxingzhong"></svg-icon>
  </div>
</template>
<script>
import { queryNotice } from '../api/login'
export default ({
  data () {
    return {}
  },
  async mounted () {
    try {
      const res = await queryNotice()
      console.log(res, '33333')
    } catch {}
  }
})
</script>
