import { AvailabilityAccountMaster } from '../AvailabilityAccountMaster'

export interface IAvailabilityAccountMasterRepository {
  one(
    availabilityAccountMasterId: string,
  ): Promise<AvailabilityAccountMaster | undefined>

  search(
    churchId: string,
    month: number,
    year: number,
  ): Promise<AvailabilityAccountMaster[] | undefined>

  upsert(accountMaster: AvailabilityAccountMaster): Promise<void>
}
