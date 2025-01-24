import { IAvailabilityAccountRepository } from '../../domain/interfaces'
import { AvailabilityAccountNotFound } from '../../domain'

export class FindAvailabilityAccountByAvailabilityAccountId {
  constructor(
    private readonly availabilityAccountRepository: IAvailabilityAccountRepository,
  ) {}

  async execute(availabilityAccountId: string) {
    const account =
      await this.availabilityAccountRepository.findAvailabilityAccountByAvailabilityAccountId(
        availabilityAccountId,
      )

    if (!account) {
      throw new AvailabilityAccountNotFound()
    }

    return account
  }
}
