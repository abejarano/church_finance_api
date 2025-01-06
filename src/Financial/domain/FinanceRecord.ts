import { MoneyLocation } from "./enums/MoneyLocation.enum";
import { FinancialConcept } from "./FinancialConcept";
import { AggregateRoot } from "../../Shared/domain";
import { IdentifyEntity } from "../../Shared/adapter";
import { ConceptType } from "./enums/ConcepType.enum";

export class FinanceRecord extends AggregateRoot {
  private id?: string;
  private financialRecordId: string;
  private financialConcept: FinancialConcept;
  private churchId: string;
  private amount: number;
  private date: Date;
  private type: ConceptType;
  private moneyLocation: MoneyLocation;
  private voucher?: string;
  private description?: string;

  static create(
    financialConcept: FinancialConcept,
    churchId: string,
    amount: number,
    date: Date,
    moneyLocation: MoneyLocation,
    description?: string,
    voucher?: string,
  ): FinanceRecord {
    const financialRecord: FinanceRecord = new FinanceRecord();
    financialRecord.financialRecordId = IdentifyEntity.get();
    financialRecord.financialConcept = financialConcept;
    financialRecord.churchId = churchId;
    financialRecord.amount = Number(amount);
    financialRecord.date = date;
    financialRecord.type = financialConcept.getType();
    financialRecord.moneyLocation = moneyLocation;
    financialRecord.voucher = voucher;
    financialRecord.description = description;

    return financialRecord;
  }

  static fromPrimitives(plainData: any): FinanceRecord {
    const financialRecord: FinanceRecord = new FinanceRecord();
    financialRecord.id = plainData?.id;
    financialRecord.financialRecordId = plainData.financialRecordId;
    financialRecord.financialConcept = FinancialConcept.fromPrimitives(
      plainData.financialConcept,
      plainData.churchId,
    );
    financialRecord.churchId = plainData.churchId;
    financialRecord.amount = plainData.amount;
    financialRecord.date = plainData.date;
    financialRecord.type = plainData.type;
    financialRecord.moneyLocation = plainData.moneyLocation;
    financialRecord.voucher = plainData.voucher;
    financialRecord.description = plainData.description;

    return financialRecord;
  }

  getId(): string {
    return this.id;
  }

  toPrimitives() {
    return {
      financialRecordId: this.financialRecordId,
      financialConcept: this.financialConcept.toPrimitives(),
      churchId: this.churchId,
      amount: this.amount,
      date: this.date,
      type: this.type,
      moneyLocation: this.moneyLocation,
      voucher: this.voucher,
      description: this.description,
    };
  }
}
