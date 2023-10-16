import {
  District,
  DistrictStructureType,
  DistrictNotFound,
  IDistrictRepository,
} from "../domain";

export class RegisterOrUpdateDistrict {
  constructor(private readonly districtRepository: IDistrictRepository) {}

  async execute(request: DistrictStructureType): Promise<void> {
    if (request.districtId) {
      await this.update(request);
      return;
    }

    const district: District = District.create(
      request.name,
      request.registerName,
      request.stateId,
    );

    await this.districtRepository.upsert(district);
  }

  private async update(request: DistrictStructureType): Promise<void> {
    const district: District = await this.districtRepository.findById(
      request.districtId,
    );
    if (!district) {
      throw new DistrictNotFound();
    }
    district.setName(request.name);
    district.setRegisterName(request.registerName);
    district.setStateId(request.stateId);
    await this.districtRepository.upsert(district);
  }
}
