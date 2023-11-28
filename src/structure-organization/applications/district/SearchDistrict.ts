import { District, IDistrictRepository } from "../../domain";
import { DistrictPaginateRequest } from "../../infrastructure";
import { Paginate } from "../../../shared/domain";

export class SearchDistrict {
  constructor(private readonly districtRepository: IDistrictRepository) {}

  async paginate(
    districtPaginateRequest: DistrictPaginateRequest,
  ): Promise<Paginate<District>> {
    return await this.districtRepository.listDistrictsByStateId(
      districtPaginateRequest.stateId,
      districtPaginateRequest.page,
      districtPaginateRequest.perPage,
    );
  }
}
