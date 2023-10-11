import { Region } from "../region";
import { District } from "../district";
import { Paginate } from "../../../shared";

export interface IDistrictRepository {
  findById(districtId: string): Promise<District>;
  pageDistrictsByStateId(
    stateId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<District>>;
}
