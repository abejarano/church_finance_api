import { AggregateRoot } from "../../Shared/domain";
import { Bank } from "./Bank";
import { IdentifyEntity } from "../../Shared/adapter";

export class CostCenter extends AggregateRoot {
  private id?: string;
  private costCenterId: string;
  private active: boolean;
  private name: string;
  private churchId: string;
  private bank: Bank;
  private createdAt: Date;

  static create(active: boolean, name: string, bank: Bank): CostCenter {
    const costCenter: CostCenter = new CostCenter();
    costCenter.active = active;
    costCenter.costCenterId = IdentifyEntity.get();
    costCenter.name = name;
    costCenter.churchId = bank.getChurchId();
    costCenter.bank = bank;
    costCenter.createdAt = new Date();
    return costCenter;
  }

  static fromPrimitives(plainData: any, bank: Bank): CostCenter {
    const costCenter: CostCenter = new CostCenter();
    costCenter.id = plainData.id;
    costCenter.active = plainData.active;
    costCenter.costCenterId = plainData.costCenterId;
    costCenter.name = plainData.name;
    costCenter.churchId = plainData.churchId;
    costCenter.bank = bank;
    costCenter.createdAt = plainData.createdAt;
    return costCenter;
  }

  getId(): string {
    return this.id;
  }

  getChurchId(): string {
    return this.churchId;
  }

  setName(name: string): void {
    this.name = name;
  }

  setBank(bank: Bank): void {
    this.bank = bank;
  }

  disable(): void {
    this.active = false;
  }

  enable(): void {
    this.active = true;
  }

  toPrimitives(): any {
    return {
      active: this.active,
      costCenterId: this.costCenterId,
      name: this.name,
      churchId: this.churchId,
      bankId: this.bank.getBankId(),
      createdAt: this.createdAt,
    };
  }
}
