import {
  IMinisterRepository,
  IRegionRepository,
  Minister,
  MinisterStructureType,
  Region,
  RegionNotFound,
} from "../../domain";

export class RegisterOrUpdateMinister {
  constructor(
    private readonly ministerRepository: IMinisterRepository,
    private readonly regionRepository: IRegionRepository,
  ) {}

  async execute(request: MinisterStructureType): Promise<void> {
    let minister: Minister = await this.ministerRepository.findByDni(
      request.dni,
    );

    if (!minister) {
      minister = await this.createMinister(request);
    }

    const region: Region = await this.getRegion(request.regionId);

    minister.setPhone(request.phone);
    minister.setEmail(request.email);
    minister.setName(request.name);
    minister.setRegion(region);

    await this.ministerRepository.upsert(minister);
  }

  private async getRegion(regionId: string): Promise<Region> {
    const region: Region = await this.regionRepository.findById(regionId);

    if (!region) {
      throw new RegionNotFound();
    }

    return region;
  }

  private async createMinister(
    request: MinisterStructureType,
  ): Promise<Minister> {
    const region: Region = await this.getRegion(request.regionId);

    return Minister.create(
      request.name,
      request.email,
      request.phone,
      request.dni,
      request.ministerType,
      region,
    );
  }
}
