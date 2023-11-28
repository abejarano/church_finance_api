import { MovementBankType } from "./enums/MovementBankType.enum";
import { IdentifyEntity } from "../../shared/adapter";
import { Bank } from "./Bank";
import { AggregateRoot } from "../../shared/domain";

export class MovementBank extends AggregateRoot {
  private id?: string;
  private movementBankId: string;
  private amount: number;
  private movementType: MovementBankType;
  private description: string;
  private bankId: string;
  private churchId: string;
  private createdAt: Date;

  static create(
    amount: number,
    movementType: MovementBankType,
    description: string,
    bank: Bank,
  ): MovementBank {
    const movementBank: MovementBank = new MovementBank();
    movementBank.amount = amount;
    movementBank.movementType = movementType;
    movementBank.description = description;
    movementBank.movementBankId = IdentifyEntity.get();
    movementBank.bankId = bank.getBankId();
    movementBank.churchId = bank.getChurchId();
    movementBank.createdAt = new Date();

    return movementBank;
  }

  static fromPrimitives(plainData: any): MovementBank {
    const movementBank: MovementBank = new MovementBank();
    movementBank.amount = plainData.amount;
    movementBank.movementType = plainData.movementType;
    movementBank.description = plainData.description;
    movementBank.movementBankId = plainData.movementBankId;
    movementBank.bankId = plainData.bankId;
    movementBank.churchId = plainData.churchId;
    movementBank.createdAt = plainData.createdAt;
    return movementBank;
  }

  getId(): string {
    return this.id;
  }

  getBankId(): string {
    return this.bankId;
  }

  getChurchId(): string {
    return this.churchId;
  }

  toPrimitives(): any {
    return {
      movementBankId: this.movementBankId,
      amount: this.amount,
      movementType: this.movementType,
      description: this.description,
      bankId: this.bankId,
      churchId: this.churchId,
      createdAt: this.createdAt,
    };
  }
}
