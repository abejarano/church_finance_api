import { District, DistrictNotFound, IDistrictRepository } from "../domain";

export class FindDistrictById {
  constructor(private readonly districtRepository: IDistrictRepository) {}

  async execute(districtId: string): Promise<District> {
    const district = await this.districtRepository.findById(districtId);
    if (!district) {
      throw new DistrictNotFound();
    }

    return district;
  }
}
