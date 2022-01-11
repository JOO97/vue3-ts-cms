//请求实例

import { BASE_URL, TIME_OUT } from './request/config'
import MyRequest from './request'

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
      return config
    },
    responseInterceptor: (res) => {
      return res
    }
  }
})

export default myRequest
