import {
  ChurchDTO,
  ChurchPaginateRequest,
  IChurchRepository,
} from '../../domain'
import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from '../../../Shared/domain'

export class SearchChurches {
  constructor(private readonly churchRepository: IChurchRepository) {}

  async execute(
    requestChurch: ChurchPaginateRequest,
  ): Promise<Paginate<ChurchDTO>> {
    return await this.churchRepository.list(this.prepareCriteria(requestChurch))
  }

  private prepareCriteria(requestChurch: ChurchPaginateRequest) {
    const filters = []

    if (requestChurch.regionId) {
      filters.push(
        new Map([
          ['field', 'region.regionId'],
          ['operator', Operator.EQUAL],
          ['value', requestChurch.regionId],
        ]),
      )
    }

    if (requestChurch.status) {
      filters.push(
        new Map([
          ['field', 'status'],
          ['operator', Operator.EQUAL],
          ['value', requestChurch.status],
        ]),
      )
    }

    return new Criteria(
      Filters.fromValues(filters),
      Order.fromValues('createdAt', OrderTypes.DESC),
      requestChurch.perPage,
      requestChurch.page,
    )
  }
}
