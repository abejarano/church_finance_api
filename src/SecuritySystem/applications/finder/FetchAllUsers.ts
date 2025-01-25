import { FilterUserRequest, IUserRepository, User } from "../../domain"
import {
  Criteria,
  Filters,
  Operator,
  Order,
  OrderTypes,
  Paginate,
} from "../../../Shared/domain"

export class FetchAllUsers {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(reqFilter: FilterUserRequest): Promise<Paginate<User>> {
    const criteria: Criteria = this.prepare(reqFilter)
    const data = await this.userRepository.fetchCriteria(criteria)

    return {
      nextPag: data.nextPag,
      count: data.count,
      results: data.results.map((user: any) => {
        const u = user
        delete u.password
        delete u._id
        return u
      }),
    }
  }

  private prepare(reqFilter: FilterUserRequest) {
    const filters: any = []
    if (reqFilter.isSuperuser) {
      const isSuperuser: boolean = reqFilter.isSuperuser === "true"

      filters.push(
        new Map<string, string | boolean>([
          ["field", "isSuperuser"],
          ["operator", Operator.EQUAL],
          ["value", isSuperuser],
        ])
      )
    }

    if (reqFilter.isActive) {
      const isActive: boolean = reqFilter.isActive === "true"

      filters.push(
        new Map<string, string | boolean>([
          ["field", "isActive"],
          ["operator", Operator.EQUAL],
          ["value", isActive],
        ])
      )
    }

    return new Criteria(
      Filters.fromValues(filters),
      Order.fromValues("createdAt", OrderTypes.DESC),
      20,
      reqFilter.page
    )
  }
}
