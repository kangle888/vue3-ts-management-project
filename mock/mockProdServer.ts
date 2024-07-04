import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userModule from './login/login'

export function setupProdMockServer() {
  createProdMockServer([...userModule])
}
