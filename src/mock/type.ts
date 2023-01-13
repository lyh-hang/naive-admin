import type { MockjsRequestOptions } from 'mockjs'

type ResFnResult = {
  code: number
  [key: string]: any
}

export type ResFn = (config: MockjsRequestOptions) => ResFnResult

export type MockOption = {
  url: string | RegExp
  type?: string
  response: ResFn
}
