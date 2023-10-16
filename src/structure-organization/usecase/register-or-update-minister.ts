import {
  IMinisterRepository,
  IRegionRepository,
  Minister,
  MinisterStructureType,
} from "../domain";

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
      minister = Minister.create(
        request.name,
        request.email,
        request.phone,
        request.dni,
        request.ministerType,
        await this.regionRepository.findById(request.regionId),
      );
    }

    await this.ministerRepository.upsert(minister);
  }
}
