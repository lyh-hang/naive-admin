import { MockMethod } from 'vite-plugin-mock'

const createData = () => ({
  expected: Array(7)
    .fill('')
    .map(() => '@integer(60, 200)'),
  actual: Array(7)
    .fill('')
    .map(() => '@integer(60, 200)')
})

export default [
  {
    url: '/api/dashboard',
    method: 'get',
    response: () => ({
      code: 200,
      data: {
        newVisits: createData(),
        order: createData(),
        car: createData(),
        purchases: createData()
      }
    })
  }
] as MockMethod[]
