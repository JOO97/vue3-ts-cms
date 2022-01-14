//请求实例

import { BASE_URL, TIME_OUT } from './request/config'
import MyRequest from './request'

import localCache from '@/utils/cache'

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    //实例的拦截器
    requestInterceptor: (config) => {
      const token = localCache.get('token')
      if (token) {
        //#NOTE:
        //ERROR 对象可能为“未定义”
        // config.headers.Authorization = `Bearer ${token}`
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    responseInterceptor: (res) => {
      return res
    }
  }
})

export default myRequest
