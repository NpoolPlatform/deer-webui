import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import good from './module-good'
import user from './module-user'
import appInfo from './module-appinfo'
import order from './module-order'
import payment from './module-payment'
import coininfo from './module-coininfo'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      good,
      user,
      appInfo,
      order,
      payment,
      coininfo
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
