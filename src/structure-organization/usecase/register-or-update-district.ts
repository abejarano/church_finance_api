import { IDistrictRepository } from "../domain/interfaces/district_repository.interface";
import { DistrictDTO } from "../domain/types/district.type";
import { DistrictNotFound } from "../domain/exceptions/district-not-found";
import { District } from "../domain/district";

export class RegisterOrUpdateDistrict {
  constructor(private readonly districtRepository: IDistrictRepository) {}

  async execute(request: DistrictDTO): Promise<void> {
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

  private async update(request: DistrictDTO): Promise<void> {
    const district = await this.districtRepository.findById(request.districtId);
    if (!district) {
      throw new DistrictNotFound();
    }
    district.setName(request.name);
    district.setRegisterName(request.registerName);
    district.setStateId(request.stateId);
    await this.districtRepository.upsert(district);
  }
}
