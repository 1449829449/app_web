// 功能权限
const permission = {
  inserted (el, name) {
    el.style.display = name.value ? '' : 'none'
  }
}

export default permission
