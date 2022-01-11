//定义、扩展接口
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface MYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors<T>
  showLoading?: boolean
}

export { MYRequestInterceptors, MyRequestConfig }
