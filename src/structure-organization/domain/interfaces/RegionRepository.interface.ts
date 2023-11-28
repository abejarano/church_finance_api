import { Region } from "../Region";
import { Paginate } from "../../../shared/domain";

export interface IRegionRepository {
  upsert(region: Region): Promise<void>;

  findById(regionId: string): Promise<Region>;

  listRegionsByDistrictId(
    districtId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<Region>>;
}
