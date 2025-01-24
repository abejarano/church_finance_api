import { ChurchStatus } from '../index'

export type ChurchPaginateRequest = {
  perPage: number
  page: number
  regionId: string
  status: ChurchStatus
}
