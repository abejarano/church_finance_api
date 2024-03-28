import { IRegionRepository, Region } from "../../domain";

export class SearchAllRegions {
  constructor(private readonly regionRepository: IRegionRepository) {}

  async execute(): Promise<Region[]> {
    return await this.regionRepository.findAll();
  }
}
