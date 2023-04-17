<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<style>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
}
</style>
<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      // 前缀需要跟vue.config中的一致
      return `#icon-${this.iconClass}`;
    },
  },
};
</script>
