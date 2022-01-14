import { createStore } from 'vuex'
import user from './user'

const store = createStore({
  state() {
    return {}
  },
  mutations: {},
  modules: {
    user
  }
})

//初始化state
export function initState() {
  store.dispatch('user/initState')
}

export default store
