// @mock/api/product.ts
import hyRequest from '@/service'

interface CategoryRes {
  id: number
  name: string
  sort: number
}

export const getAllCategory = () => {
  return hyRequest.get<CategoryRes>({
    url: '/product/cat'
  })
}
