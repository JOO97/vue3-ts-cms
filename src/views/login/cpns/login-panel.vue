<template>
  <div class="login-panel">
    <h1 class="title">xxxx</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <account-form ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <!-- <login-phone /> -->
      </el-tab-pane>
    </el-tabs>

    <div class="checkbox-row">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="btn" @click="handleLoginBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AccountForm from './account-form.vue'
import localCache from '@/utils/cache'

export default defineComponent({
  components: {
    AccountForm
  },
  setup() {
    const isKeepPassword = ref(localCache.get('isKeepPassword') ?? false)
    const currentTab = ref('account')

    //NOTE:
    const accountRef = ref<InstanceType<typeof AccountForm>>()

    const handleLoginBtnClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.handleLogin(isKeepPassword.value)
      }
    }
    return { handleLoginBtnClick, isKeepPassword, currentTab, accountRef }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .checkbox-row {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
