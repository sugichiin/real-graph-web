// import something here

// "async" is optional
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.directive('link', {
    bind: (el, binding, vue) => {
      el.addEventListener('click', e => {
        const router = vue.context.$router || vue.$router || vue.componentInstance.$router
        router.push(binding.value)
      })
    }
  })
}
