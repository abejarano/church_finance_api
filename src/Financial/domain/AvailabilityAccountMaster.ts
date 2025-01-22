import { AggregateRoot } from "../../Shared/domain";
import IdentifyAvailabilityAccountMaster from "../applications/availabilityAccount/helpers/IdentifyAvailabilityAccountMaster";
import { AvailabilityAccount } from "./AvailabilityAccount";

export class AvailabilityAccountMaster extends AggregateRoot {
  private id?: string;
  private churchId: string;
  private availabilityAccountId: string;
  private availabilityAccountMasterId: string;
  private month: number;
  private year: number;
  private totalOutput: number;
  private totalInput: number;

  static create(availabilityAccount: AvailabilityAccount) {
    const availabilityAccountMaster = new AvailabilityAccountMaster();

    availabilityAccountMaster.month = new Date().getMonth() + 1;
    availabilityAccountMaster.year = new Date().getFullYear();
    availabilityAccountMaster.totalOutput = 0;
    availabilityAccountMaster.totalInput = 0;
    availabilityAccountMaster.availabilityAccountId =
      availabilityAccount.getAvailabilityAccountId();
    availabilityAccountMaster.availabilityAccountMasterId =
      IdentifyAvailabilityAccountMaster(
        availabilityAccount.getAvailabilityAccountId(),
      );
    availabilityAccountMaster.churchId = availabilityAccount.getChurchId();

    return availabilityAccountMaster;
  }

  static fromPrimitives(plainData: any) {
    const availabilityAccountMaster = new AvailabilityAccountMaster();

    availabilityAccountMaster.id = plainData.id;
    availabilityAccountMaster.month = plainData.month;
    availabilityAccountMaster.year = plainData.year;
    availabilityAccountMaster.totalOutput = plainData.totalOutput;
    availabilityAccountMaster.totalInput = plainData.totalInput;
    availabilityAccountMaster.availabilityAccountId =
      plainData.availabilityAccountId;
    availabilityAccountMaster.availabilityAccountMasterId =
      plainData.availabilityAccountMasterId;
    availabilityAccountMaster.churchId = plainData.churchId;

    return availabilityAccountMaster;
  }

  getId(): string {
    return this.id;
  }

  getAvailabilityAccountMasterId(): string {
    return this.availabilityAccountMasterId;
  }

  updateMaster(
    amount: number,
    operationType: "MONEY_IN" | "MONEY_OUT",
  ): AvailabilityAccountMaster {
    if (operationType === "MONEY_IN") {
      this.totalInput += amount;
    } else {
      this.totalOutput += amount;
    }
    return this;
  }

  toPrimitives() {
    return {
      month: this.month,
      year: this.year,
      totalOutput: this.totalOutput,
      totalInput: this.totalInput,
      availabilityAccountId: this.availabilityAccountId,
      availabilityAccountMasterId: this.availabilityAccountMasterId,
      churchId: this.churchId,
    };
  }
}
