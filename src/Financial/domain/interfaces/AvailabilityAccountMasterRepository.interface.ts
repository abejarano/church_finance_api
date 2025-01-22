import { AvailabilityAccountMaster } from "../AvailabilityAccountMaster";

export interface IAvailabilityAccountMasterRepository {
  findByAvailabilityAccountMasterId(
    availabilityAccountMasterId: string,
  ): Promise<AvailabilityAccountMaster | undefined>;

  searchAvailabilityAccountMaster(
    churchId: string,
    month: number,
    year: number,
  ): Promise<AvailabilityAccountMaster[] | undefined>;

  upsert(accountMaster: AvailabilityAccountMaster): Promise<void>;
}
