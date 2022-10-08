import { setmodules } from './modules/setmodules'
import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import { initFirebase } from './initFirebase'
// import { store } from 'quasar/wrappers'

const storeData = {
  plugins: [],
  modules: setmodules()
}

const app = createApp({ App })
const Store = createStore(storeData)
app.use(Store)
initFirebase()

export interface StateInterface {
  example: unknown
}

// export default store(() => Store)
