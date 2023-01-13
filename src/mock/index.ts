import Mock, { MockjsRequestOptions } from 'mockjs'
import user from './user'

import type { ResFn } from './type'

const mocks = [...user]

function useMock() {
  function ReqConfig2Json(fn: ResFn): Mock.templateOrFn {
    return function (option: MockjsRequestOptions) {
      return fn({
        type: option.type,
        body: JSON.parse(option.body),
        url: option.url
      })
    }
  }
  mocks.forEach(i => {
    Mock.mock(i.url, i.type || 'get', ReqConfig2Json(i.response))
  })
}

export { useMock as default }
