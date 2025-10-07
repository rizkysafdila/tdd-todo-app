import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    // coverage: {
    //   enabled: true,
    //   provider: 'v8',
    //   reportsDirectory: '../tests/unit/coverage'
    // },
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true
        }
      }
    }
  }
})
