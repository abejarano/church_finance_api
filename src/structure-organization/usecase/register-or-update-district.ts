import {
  District,
  DistrictStructureType,
  DistrictNotFound,
  IDistrictRepository,
} from "../domain";
import { IWorldRepository, States } from "../../world/domain";
import { StateNotFound } from "../../world/domain/exceptions/state-not-found.exception";

export class RegisterOrUpdateDistrict {
  constructor(
    private readonly districtRepository: IDistrictRepository,
    private readonly worldRepository: IWorldRepository,
  ) {}

  async execute(request: DistrictStructureType): Promise<void> {
    if (request.districtId) {
      await this.update(request);
      return;
    }

    const state = await this.findState(request.stateId);

    const district: District = District.create(request.name, state);

    await this.districtRepository.upsert(district);
  }

  private async findState(stateId: string): Promise<States> {
    const state = await this.worldRepository.findStateById(stateId);
    if (!state) {
      throw new StateNotFound();
    }

    return state;
  }

  private async update(request: DistrictStructureType): Promise<void> {
    const district: District = await this.districtRepository.findById(
      request.districtId,
    );
    if (!district) {
      throw new DistrictNotFound();
    }

    const state: States = await this.findState(request.stateId);

    district.setName(request.name);
    district.setState(state);
    await this.districtRepository.upsert(district);
  }
}
