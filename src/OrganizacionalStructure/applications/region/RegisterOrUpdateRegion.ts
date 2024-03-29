import {
  District,
  DistrictNotFound,
  IDistrictRepository,
  IRegionRepository,
  Region,
  RegionNotFound,
  RegionStructureType,
} from "../../domain";

export class RegisterOrUpdateRegion {
  constructor(
    private readonly regionRepository: IRegionRepository,
    private readonly districtRepository: IDistrictRepository,
  ) {}

  async execute(request: RegionStructureType): Promise<Region> {
    if (request.regionId) {
      return await this.update(request);
    }

    const district: District = await this.districtRepository.findById(
      request.districtId,
    );
    if (!district) {
      throw new DistrictNotFound();
    }

    const region: Region = Region.create(request.name, district);
    await this.regionRepository.upsert(region);

    return region;
  }

  private async update(request: RegionStructureType): Promise<Region> {
    const region: Region = await this.regionRepository.findById(
      request.regionId,
    );

    if (!region) {
      throw new RegionNotFound();
    }

    region.setName(request.name);
    await this.regionRepository.upsert(region);
    return region;
  }
}
