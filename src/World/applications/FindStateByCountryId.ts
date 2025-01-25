import { IWorldRepository, States } from "../domain"

export class FindStateByCountryId {
  constructor(private readonly worldRepository: IWorldRepository) {}

  async run(countryId: string): Promise<States[]> {
    return await this.worldRepository.findByCountryId(countryId)
  }
}
