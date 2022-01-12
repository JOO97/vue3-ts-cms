<template>
  <div>
    <h1>home</h1>
    <el-button>button</el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import myRequest from '@/service'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    localCache.set('user', {
      name: 'codertest',
      password: '123456'
    })
    // myRequest.request({
    //   url: '/login',
    //   method: 'POST',
    //   data: {
    //     name: 'codertest',
    //     password: '123456'
    //   }
    // })
  }
})
</script>

<style lang="less" scoped></style>
