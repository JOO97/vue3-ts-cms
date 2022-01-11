import myRequest from '../index'
import { IDataType, ILoginResult, IAccount } from './type'

export function accountLoginReq(account: IAccount) {
  return myRequest.post<IDataType<ILoginResult>>({
    url: '/login',
    data: account
  })
}

export function reqUserInfoById(id: string) {
  return myRequest.get<IDataType>({
    url: `/users/${id}`
  })
}

export function reqUserMenuByRoleId(roleId: string) {
  return myRequest.get<IDataType>({
    url: `/role/${roleId}/menu`
  })
}
