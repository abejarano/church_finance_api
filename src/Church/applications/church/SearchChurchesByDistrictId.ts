import { Church, IChurchRepository } from '../../domain'

export class SearchChurchesByDistrictId {
  constructor(private readonly churchRepository: IChurchRepository) {}

  async execute(districtId: string): Promise<Church[]> {
    return await this.churchRepository.listByDistrictId(districtId)
  }
}
