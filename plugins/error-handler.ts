export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast()
  nuxtApp.vueApp.config.errorHandler = (error) => {
    const err = error as Error
    toast.add({ title: 'Error', description: err.message })
  }

  // // Also possible
  // nuxtApp.hook('vue:error', (error, instance, info) => {
  //   // handle error, e.g. report to a service
  // })
})
