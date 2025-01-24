import { AvailabilityAccount } from '../AvailabilityAccount'

export interface IAvailabilityAccountRepository {
  upsert(availabilityAccount: AvailabilityAccount): Promise<void>

  findAvailabilityAccountByAvailabilityAccountId(
    availabilityAccountId: string,
  ): Promise<AvailabilityAccount | undefined>

  searchAvailabilityAccountsByChurchId(
    churchId: string,
  ): Promise<AvailabilityAccount[]>
}
