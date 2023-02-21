import request from '@/utils/request'

interface ChartData {
  [key: string]: any
  expected: Array<number>
  actual: Array<number>
}

export interface Chart {
  [key: string]: ChartData
  newVisits: ChartData
  order: ChartData
  car: ChartData
  purchases: ChartData
}

interface dashboardRes {
  code: number
  data: Chart
}

export function reqDashboardData() {
  return request<dashboardRes>({ url: '/dashboard' })
}
