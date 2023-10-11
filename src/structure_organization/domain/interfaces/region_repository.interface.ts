import { Region } from "../region";
import { Paginate } from "../../../shared";

export interface IRegionRepository {
  upsert(region: Region): Promise<void>;
  findById(regionId: string): Promise<Region>;
  pageRegionsByDistrictId(
    districtId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<Region>>;
}
