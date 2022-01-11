//封装请求类
import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { MYRequestInterceptors, MyRequestConfig } from './type'

import { ElLoading } from 'element-plus'
// import type { LoadingOptionsResolved } from 'element-plus/lib/components/loading/src/types'

const DEFAULT_SHOW_LOADING = false

//#TODO
const responseHandler = (res: AxiosResponse): any => {
  const { data, code } = res.data
  if (code === 0) {
    return data
  }
  console.log('error')
}
//#TODO
const httpErrorCodeHandler = (err: any): void => {
  const { status } = err.response
  if (status === 404) {
    console.log('404')
  }
}

class MyRequest {
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors
  isShowLoading: boolean = DEFAULT_SHOW_LOADING
  loading?: any

  constructor(config: MyRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)

    //loading
    this.isShowLoading = config.showLoading ?? DEFAULT_SHOW_LOADING

    //使用实例的拦截器
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        if (this.isShowLoading) {
          console.log(
            ElLoading.service({
              lock: true,
              text: 'loading....',
              background: 'rgba(0, 0, 0, 0.5)'
            })
          )
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        // 移除loading
        this.loading?.close()

        return responseHandler(response)
        // return response
      },
      (err) => {
        // 移除loading
        this.loading?.close()
        httpErrorCodeHandler(err)
        return err
      }
    )
  }
  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求的请求拦截器
      if (config.interceptors?.requestInterceptor) {
        this.instance.interceptors.request.use(
          config.interceptors.requestInterceptor
        )
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //单个请求的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          this.isShowLoading = DEFAULT_SHOW_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.isShowLoading = DEFAULT_SHOW_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
