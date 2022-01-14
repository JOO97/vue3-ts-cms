<template>
  <div class="account-form">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { accountRules as rules } from '../config'
import localCache from '@/utils/cache'

import { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    const store = useStore()
    const formRef = ref<InstanceType<typeof ElForm>>()

    const lsAccount = localCache.get('user_account')
    const account = reactive({
      name: lsAccount?.name ?? 'coderwhy',
      password: lsAccount?.password ?? '123456'
    })
    store.dispatch('user/accountLogin', { ...account })

    const handleLogin = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.set('user_account', account)
          } else {
            localCache.remove('user_account')
          }
          //NOTE:
          store.dispatch('user/accountLogin', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      formRef,
      handleLogin
    }
  }
})
</script>

<style scoped></style>
