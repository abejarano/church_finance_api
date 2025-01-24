import { AggregateRoot } from "../../Shared/domain";
import { CostCenter } from "./CostCenter";
import { DateBR } from "../../Shared/helpers";
import MasterBalanceIdentifier from "../applications/helpers/MasterBalanceIdentifier";

export class CostCenterMaster extends AggregateRoot {
  private id?: string;
  private costCenterMasterId: string;
  private costCenter: {
    costCenterId: string;
    costCenterName: string;
  };
  private churchId: string;
  private month: number;
  private year: number;
  private total: number;
  private lastMove: Date;

  static create(costCenter: CostCenter) {
    const costCenterMaster = new CostCenterMaster();

    costCenterMaster.costCenterMasterId = MasterBalanceIdentifier(
      costCenter.getCostCenterId(),
    );
    costCenterMaster.month = new Date().getMonth() + 1;
    costCenterMaster.year = new Date().getFullYear();
    costCenterMaster.total = 0;
    costCenterMaster.costCenter = {
      costCenterId: costCenter.getCostCenterId(),
      costCenterName: costCenter.getCostCenterName(),
    };
    costCenterMaster.churchId = costCenter.getChurchId();

    return costCenterMaster;
  }

  static fromPrimitives(plainData: any) {
    const costCenterMaster = new CostCenterMaster();

    costCenterMaster.id = plainData.id;
    costCenterMaster.month = plainData.month;
    costCenterMaster.year = plainData.year;
    costCenterMaster.total = plainData.total;
    costCenterMaster.costCenter = plainData.costCenter;
    costCenterMaster.churchId = plainData.churchId;
    costCenterMaster.lastMove = plainData.lastMove;

    return costCenterMaster;
  }

  updateMaster(total: number) {
    this.total += Number(total);
    this.lastMove = DateBR();
  }

  getId(): string {
    return this.id;
  }

  toPrimitives() {
    return {
      costCenterMasterId: this.costCenterMasterId,
      costCenter: this.costCenter,
      churchId: this.churchId,
      month: this.month,
      year: this.year,
      total: this.total,
      lastMove: this.lastMove,
    };
  }
}
