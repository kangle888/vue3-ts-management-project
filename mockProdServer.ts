import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userModule from './mock/login/login'
import orderModule from './mock/main/system/user/order-list'

export function setupProdMockServer() {
  createProdMockServer([...userModule, ...orderModule])
}
