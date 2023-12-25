import { AggregateRoot, AmountValueObject } from "../../shared/domain";
import { OnlineContributionsType } from "./enums/OnlineContributionsType.enum";
import { OnlineContributionsStatus } from "./enums/OnlineContributionsStatus.enum";
import { IdentifyEntity } from "../../shared/adapter";
import { Member } from "../../church/domain";

export class OnlineContributions extends AggregateRoot {
  private id?: string;
  private member: Member;
  private OnlineContributionsId: string;
  private type: OnlineContributionsType;
  private status: OnlineContributionsStatus;
  private amount: number;
  private bankTransferReceipt: string;
  private createdAt: Date;

  static create(
    type: OnlineContributionsType,
    amount: AmountValueObject,
    member: Member,
    bankTransferReceipt: string,
  ): OnlineContributions {
    const contributions: OnlineContributions = new OnlineContributions();
    contributions.member = member;
    contributions.OnlineContributionsId = IdentifyEntity.get();
    contributions.bankTransferReceipt = bankTransferReceipt;
    contributions.type = type;
    contributions.status = OnlineContributionsStatus.PENDING_VERIFICATION;
    contributions.amount = amount.getValue();
    contributions.createdAt = new Date();
    return contributions;
  }

  static fromPrimitives(plainData: any): OnlineContributions {
    const contributions: OnlineContributions = new OnlineContributions();
    contributions.id = plainData.id;
    contributions.member = plainData.member;
    contributions.OnlineContributionsId = plainData.OnlineContributionsId;
    contributions.type = plainData.type;
    contributions.status = plainData.status;
    contributions.amount = plainData.amount;
    contributions.createdAt = plainData.createdAt;
    contributions.bankTransferReceipt = plainData.bankTransferReceipt;
    return contributions;
  }

  getId(): string {
    return this.id;
  }

  toPrimitives() {
    return {
      OnlineContributionsId: this.OnlineContributionsId,
      member: this.member,
      type: this.type,
      status: this.status,
      amount: this.amount,
      createdAt: this.createdAt,
      bankTransferReceipt: this.bankTransferReceipt,
    };
  }
}
