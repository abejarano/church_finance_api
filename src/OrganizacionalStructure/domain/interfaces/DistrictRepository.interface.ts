import { District } from "../District";
import { Paginate } from "../../../Shared/domain";

export interface IDistrictRepository {
  findById(districtId: string): Promise<District>;

  listDistrictsByStateId(
    stateId: string,
    page: number,
    perPage: number,
  ): Promise<Paginate<District>>;

  findAll(): Promise<District[]>;

  upsert(district: District): Promise<void>;
}
