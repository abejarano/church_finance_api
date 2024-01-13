import { AggregateRoot, AmountValueObject } from "../../shared/domain";
import { OnlineContributionsType } from "./enums/OnlineContributionsType.enum";
import { OnlineContributionsStatus } from "./enums/OnlineContributionsStatus.enum";
import { IdentifyEntity } from "../../shared/adapter";
import { Member } from "../../church/domain";
import { FinancialConcept } from "./FinancialConcept";
import { FinancialConceptDisable } from "./exceptions/FinancialConceptDisable.exception";

export class OnlineContributions extends AggregateRoot {
  private id?: string;
  private churchId: string;
  private member: Member;
  private contributionId: string;
  private type: OnlineContributionsType;
  private status: OnlineContributionsStatus;
  private financialConcept: FinancialConcept;
  private amount: number;
  private bankTransferReceipt: string;
  private createdAt: Date;

  static create(
    type: OnlineContributionsType,
    amount: AmountValueObject,
    member: Member,
    financialConcept: FinancialConcept,
    bankTransferReceipt: string,
  ): OnlineContributions {
    const contributions: OnlineContributions = new OnlineContributions();
    contributions.member = member;
    contributions.churchId = member.getChurchId();
    contributions.contributionId = IdentifyEntity.get();
    contributions.bankTransferReceipt = bankTransferReceipt;
    contributions.type = type;
    contributions.status = OnlineContributionsStatus.PENDING_VERIFICATION;
    contributions.amount = amount.getValue();
    contributions.createdAt = new Date();
    contributions.financialConcept = financialConcept;

    if (financialConcept.isDisable()) {
      throw new FinancialConceptDisable();
    }

    return contributions;
  }

  static fromPrimitives(plainData: any): OnlineContributions {
    const contributions: OnlineContributions = new OnlineContributions();
    contributions.id = plainData.id;
    contributions.member = plainData.member;
    contributions.contributionId = plainData.contributionId;
    contributions.type = plainData.type;
    contributions.status = plainData.status;
    contributions.amount = plainData.amount;
    contributions.createdAt = plainData.createdAt;
    contributions.bankTransferReceipt = plainData.bankTransferReceipt;
    contributions.churchId = plainData.churchId;
    contributions.financialConcept = FinancialConcept.fromPrimitives(
      plainData.financialConcept,
      plainData.churchId,
    );
    return contributions;
  }

  getId(): string {
    return this.id;
  }

  getAmount() {
    return this.amount;
  }

  getStatus() {
    return this.status;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  toPrimitives() {
    return {
      contributionId: this.contributionId,
      member: this.member,
      type: this.type,
      status: this.status,
      amount: this.amount,
      createdAt: this.createdAt,
      bankTransferReceipt: this.bankTransferReceipt,
      churchId: this.churchId,
      financialConcept: this.financialConcept.toPrimitives(),
    };
  }
}
