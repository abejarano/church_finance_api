import {
  IMinisterRepository,
  IRegionRepository,
  Minister,
  MinisterStructureType,
  Region,
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

    //if (!minister) {
    minister = await this.createMinister(request);
    //}

    //await this.ministerRepository.upsert(minister);
  }

  private async createMinister(
    request: MinisterStructureType,
  ): Promise<Minister> {
    const region: Region = await this.regionRepository.findById(
      request.regionId,
    );

    if (!region) {
      throw new Error("Region not found");
    }

    console.log(region);

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
