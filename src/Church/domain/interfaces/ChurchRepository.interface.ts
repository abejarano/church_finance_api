import { Church } from "../Church"
import { Criteria, Paginate } from "../../../Shared/domain"
import { ChurchDTO } from "../type/Church.dto.type"

export interface IChurchRepository {
  findById(churchId: string): Promise<Church | undefined>

  upsert(church: Church): Promise<void>

  list(criteria: Criteria): Promise<Paginate<ChurchDTO>>

  listByDistrictId(districtId: string): Promise<Church[]>

  hasAnAssignedMinister(
    churchId: string
  ): Promise<[boolean, Church | undefined]>

  withoutAssignedMinister(): Promise<Church[]>
}
