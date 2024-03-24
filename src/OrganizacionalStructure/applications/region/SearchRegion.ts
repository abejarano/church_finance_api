import { IRegionRepository, Region } from "../../domain";
import { Paginate } from "../../../Shared/domain";
import { RegionPaginateRequest } from "../../infrastructure/http/requests/RegionPaginate.request";

export class SearchRegion {
  constructor(private readonly regionRepository: IRegionRepository) {}

  async paginate(
    regionPaginateRequest: RegionPaginateRequest,
  ): Promise<Paginate<Region>> {
    return await this.regionRepository.listRegionsByDistrictId(
      regionPaginateRequest.districtId,
      regionPaginateRequest.page,
      regionPaginateRequest.perPage,
    );
  }
}
