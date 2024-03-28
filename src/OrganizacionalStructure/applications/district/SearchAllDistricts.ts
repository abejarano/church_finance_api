import { District, IDistrictRepository } from "../../domain";

export class SearchAllDistricts {
  constructor(private readonly districtRepository: IDistrictRepository) {}

  async execute(): Promise<District[]> {
    return await this.districtRepository.findAll();
  }
}
