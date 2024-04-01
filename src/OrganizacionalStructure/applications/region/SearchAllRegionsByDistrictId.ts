import { IRegionRepository, Region } from "../../domain";

export class SearchAllRegionsByDistrictId {
  constructor(private readonly regionRepository: IRegionRepository) {}

  async execute(districtId: string): Promise<Region[]> {
    return await this.regionRepository.findAllByDistrictId(districtId);
  }
}
