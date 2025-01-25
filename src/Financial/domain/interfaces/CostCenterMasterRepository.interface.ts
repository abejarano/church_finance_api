import { CostCenterMaster } from "../CostCenterMaster"

export interface ICostCenterMasterRepository {
  one(costCenterMasterId: string): Promise<CostCenterMaster | undefined>

  search(
    churchId: string,
    month: number,
    year: number
  ): Promise<CostCenterMaster[]>

  upsert(costCenterMaster: CostCenterMaster): Promise<void>
}
