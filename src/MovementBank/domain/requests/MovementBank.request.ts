import { MovementBankType } from "../enums/MovementBankType.enum";
import { Bank } from "../../../Financial/domain";

export type MovementBankRequest = {
  amount: number;
  movementType: MovementBankType;
  description: string;
  bank: Bank;
};
