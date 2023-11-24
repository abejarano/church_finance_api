import { District } from "../District";
import { Paginate } from "../../../shared";

export interface IDistrictRepository {
  findById(districtId: string): Promise<District>;
  listDistrictsByStateId(
    stateId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<District>>;
  upsert(district: District): Promise<void>;
}
