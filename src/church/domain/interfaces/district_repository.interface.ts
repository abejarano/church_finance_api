import { Region } from "../region";
import { District } from "../district";

export interface IDistrictRepository {
  allRegions(): Promise<Region[]>;
  findById(districtId: string): Promise<District>;
}
