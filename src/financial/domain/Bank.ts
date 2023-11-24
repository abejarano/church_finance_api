import { AccountType } from "./enums/account-type.enum";
import { AggregateRoot, IdentifyEntity } from "../../shared";
import { Church } from "../../church/domain";

export class Bank extends AggregateRoot {
  private id?: string;
  private accountType: AccountType;
  private bankId: string;
  private churchId: string;
  private active: boolean;
  private name: string;
  private addressInstancePayment: string;
  private bankInstruction: string;

  static create(
    accountType: AccountType,
    active: boolean,
    name: string,
    addressInstancePayment: string,
    bankInstruction: string,
    church: Church,
  ): Bank {
    const bank: Bank = new Bank();
    bank.accountType = accountType;
    bank.active = active;
    bank.bankId = IdentifyEntity.get();
    bank.name = name;
    bank.addressInstancePayment = addressInstancePayment;
    bank.bankInstruction = bankInstruction;
    bank.churchId = church.getChurchId();
    return bank;
  }

  static fromPrimitives(plainData: any): Bank {
    const bank: Bank = new Bank();
    bank.accountType = plainData.accountType;
    bank.active = plainData.active;
    bank.bankId = plainData.bankId;
    bank.name = plainData.name;
    bank.addressInstancePayment = plainData.addressInstancePayment;
    bank.bankInstruction = plainData.bankInstruction;
    bank.churchId = plainData.churchId;
    return bank;
  }

  getId(): string {
    return this.id;
  }

  getChurchId(): string {
    return this.churchId;
  }

  getBankId(): string {
    return this.bankId;
  }

  toPrimitives(): any {
    return {
      accountType: this.accountType,
      active: this.active,
      bankId: this.bankId,
      name: this.name,
      addressInstancePayment: this.addressInstancePayment,
      bankInstruction: this.bankInstruction,
      churchId: this.churchId,
    };
  }
}
