//登录接口返回格式
export interface IDataType<T = any> {
  code: number
  data: T
}

//登录接口的data返回格式
export interface ILoginResult {
  id: number
  name: string
  token: string
}

//登录req
export interface IAccount {
  password: string
  name: string
}
