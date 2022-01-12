import type { Module } from 'vuex'
import { IUserState } from './type'
import { IRootState } from '../type'

import {
  accountLoginReq,
  reqUserInfoById,
  reqUserMenuByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'

//Module<模型state, 根State>
const loginModule: Module<IUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      isKeepPassword: false,
      token: '',
      userInfo: null,
      userMenus: null
    }
  },
  mutations: {
    updateToken(state, token) {
      state.token = token
      localCache.set('token', token)
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      localCache.set('userInfo', userInfo)
    },
    updateUserMenus(state, menus) {
      state.userMenus = menus
      localCache.set('userMenus', menus)
    }
  },
  actions: {
    async accountLogin({ commit, dispatch }, payload) {
      const res = await accountLoginReq(payload)
      const { id, token } = res.data
      commit('updateToken', token)
      dispatch('getUserInfo', id)
    },
    async getUserInfo({ commit, dispatch }, id) {
      const res = await reqUserInfoById(id)
      commit('updateUserInfo', res.data)
      dispatch('getUserMenus', res.data.role.id)
    },
    async getUserMenus({ commit }, roleId) {
      const res = await reqUserMenuByRoleId(roleId)
      commit('updateUserMenus', res.data)
    },
    initState({ commit }) {
      const token = localCache.get('token')
      token && commit('updateToken', token)
      const userInfo = localCache.get('userInfo')
      token && commit('updateUserInfo', userInfo)
      const userMenus = localCache.get('userMenus')
      token && commit('updateUserMenus', userMenus)
    }
  },
  getters: {}
}

export default loginModule
