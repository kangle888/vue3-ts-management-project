const category = [
  {
    id: 1,
    name: '商品1',
    sort: 1
  },
  {
    id: 2,
    name: '商品2',
    sort: 2
  },
  {
    id: 3,
    name: '商品3',
    sort: 3
  }
]

export default [
  {
    url: '/api/product/cat',
    method: 'GET',
    response: () => {
      console.log('调用了吗1111')
      return {
        code: 200,
        message: '返回成功',
        data: {
          result: category
        },
        status: 'ok'
      }
    }
  }
]
