import { Region } from "../region";

export interface IRegionRepository {
  upsert(region: Region): Promise<void>;
  findById(regionId: string): Promise<Region>;
}
