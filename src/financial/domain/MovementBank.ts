import { MovementBankType } from "./enums/MovementBankType.enum";
import { IdentifyEntity } from "../../shared/adapter";
import { Bank } from "./Bank";

export class MovementBank {
  private movementBankId: string;
  private amount: number;
  private movementType: MovementBankType;
  private description: string;
  private bank: Bank;
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
    movementBank.bank = bank;
    movementBank.createdAt = new Date();
    return movementBank;
  }

  static fromPrimitives(plainData: any, bank: Bank): MovementBank {
    const movementBank: MovementBank = new MovementBank();
    movementBank.amount = plainData.amount;
    movementBank.movementType = plainData.movementType;
    movementBank.description = plainData.description;
    movementBank.movementBankId = plainData.movementBankId;
    movementBank.bank = bank;
    movementBank.createdAt = plainData.createdAt;
    return movementBank;
  }

  getBank(): Bank {
    return this.bank;
  }

  toPrimitives(): any {
    return {
      movementBankId: this.movementBankId,
      amount: this.amount,
      movementType: this.movementType,
      description: this.description,
      bankId: this.bank.getBankId(),
      createdAt: this.createdAt,
    };
  }
}
