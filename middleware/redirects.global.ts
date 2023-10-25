export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/home') {
    return navigateTo('/', { redirectCode: 302 })
  }

  if (to.path === '/panel') {
    const runtimeConfig = useRuntimeConfig();
    return navigateTo(`${runtimeConfig.app.KIRBY_BASE_URL}/panel`, { external: true, redirectCode: 302})
  }
})
