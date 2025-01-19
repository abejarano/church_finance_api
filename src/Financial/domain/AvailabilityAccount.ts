import { AccountType } from "./enums/AccountType.enum";
import { IdentifyEntity } from "../../Shared/adapter";

export class AvailabilityAccount {
  private churchId: string;
  private availabilityAccountId: string;
  private accountName: string;
  private balance: number;
  private active: boolean;
  private accountType: AccountType;
  private lastMove: Date;

  static create(
    churchId: string,
    accountName: string,
    active: boolean,
    accountType: AccountType,
  ): AvailabilityAccount {
    const account: AvailabilityAccount = new AvailabilityAccount();
    account.churchId = churchId;
    account.availabilityAccountId = IdentifyEntity.get();
    account.accountName = accountName;
    account.balance = 0;
    account.active = active;
    account.accountType = accountType;

    return account;
  }

  static fromPrimitives(plainData: any): AvailabilityAccount {
    const account: AvailabilityAccount = new AvailabilityAccount();
    account.churchId = plainData.churchId;
    account.availabilityAccountId = plainData.availabilityAccountId;
    account.accountName = plainData.accountName;
    account.balance = plainData.balance;
    account.active = plainData.active;
    account.accountType = plainData.accountType;
    account.lastMove = plainData.lastMove;

    return account;
  }

  getChurchId() {
    return this.churchId;
  }

  getAvailabilityAccountId() {
    return this.availabilityAccountId;
  }

  setNewBalance(balance: number) {
    this.balance = balance;
    this.lastMove = new Date();
  }

  setAccountName(accountName: string) {
    this.accountName = accountName;
  }

  enable() {
    this.active = true;
  }

  disable() {
    this.active = false;
  }

  toPrimitives() {
    return {
      churchId: this.churchId,
      availabilityAccountId: this.availabilityAccountId,
      accountName: this.accountName,
      balance: this.balance,
      active: this.active,
      accountType: this.accountType,
      lastUpdate: this.lastMove,
    };
  }
}
