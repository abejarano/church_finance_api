import { TypeBankAccount } from "./enums/TypeBankAccount";
import { AggregateRoot } from "../../shared/domain";
import { Church } from "../../church/domain";
import { IdentifyEntity } from "../../shared/adapter";

export class Bank extends AggregateRoot {
  private id?: string;
  private accountType: TypeBankAccount;
  private bankId: string;
  private churchId: string;
  private active: boolean;
  private name: string;
  private tag: string;
  private addressInstancePayment: string;
  private bankInstruction: any;

  static create(
    accountType: TypeBankAccount,
    active: boolean,
    name: string,
    tag: string,
    addressInstancePayment: string,
    bankInstruction: string,
    church: Church,
  ): Bank {
    const bank: Bank = new Bank();
    bank.accountType = accountType;
    bank.active = active;
    bank.bankId = IdentifyEntity.get();
    bank.name = name;
    bank.tag = tag;
    bank.addressInstancePayment = addressInstancePayment;
    bank.bankInstruction = bankInstruction;
    bank.churchId = church.getChurchId();
    return bank;
  }

  static fromPrimitives(plainData: any): Bank {
    const bank: Bank = new Bank();
    bank.id = plainData.id;
    bank.accountType = plainData.accountType;
    bank.active = plainData.active;
    bank.bankId = plainData.bankId;
    bank.name = plainData.name;
    bank.tag = plainData.tag;
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

  isActive(): boolean {
    return this.active;
  }

  setInstancePaymentAddress(address: string): void {
    this.addressInstancePayment = address;
  }

  setBankInstruction(instruction: string): void {
    this.bankInstruction = instruction;
  }

  setAccountType(accountType: TypeBankAccount): void {
    this.accountType = accountType;
  }

  toPrimitives(): any {
    return {
      accountType: this.accountType,
      active: this.active,
      bankId: this.bankId,
      name: this.name,
      tag: this.tag,
      addressInstancePayment: this.addressInstancePayment,
      bankInstruction: this.bankInstruction,
      churchId: this.churchId,
    };
  }
}
