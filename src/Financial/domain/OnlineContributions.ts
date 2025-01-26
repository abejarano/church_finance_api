import { AggregateRoot, AmountValueObject } from "../../Shared/domain"
import { OnlineContributionsStatus } from "./enums/OnlineContributionsStatus.enum"
import { IdentifyEntity } from "../../Shared/adapter"
import { Member } from "../../Church/domain"
import { FinancialConcept } from "./FinancialConcept"
import { FinancialConceptDisable } from "./exceptions/FinancialConceptDisable.exception"
import { DateBR } from "../../Shared/helpers"

export class OnlineContributions extends AggregateRoot {
  private id?: string
  private churchId: string
  private member: Member
  private contributionId: string
  private status: OnlineContributionsStatus
  private financialConcept: FinancialConcept
  private amount: number
  private bankTransferReceipt: string
  private observation: string
  private createdAt: Date
  private bankId: string

  static create(
    amount: AmountValueObject,
    member: Member,
    financialConcept: FinancialConcept,
    bankTransferReceipt: string,
    observation: string,
    bankId: string
  ): OnlineContributions {
    const contributions: OnlineContributions = new OnlineContributions()
    contributions.member = member
    contributions.churchId = member.getChurchId()
    contributions.contributionId = IdentifyEntity.get()
    contributions.bankTransferReceipt = bankTransferReceipt

    contributions.status = OnlineContributionsStatus.PENDING_VERIFICATION
    contributions.amount = amount.getValue()
    contributions.createdAt = DateBR()
    contributions.financialConcept = financialConcept
    contributions.bankId = bankId

    if (financialConcept.isDisable()) {
      throw new FinancialConceptDisable()
    }

    contributions.observation = observation

    return contributions
  }

  static fromPrimitives(plainData: any): OnlineContributions {
    const contributions: OnlineContributions = new OnlineContributions()
    contributions.id = plainData.id
    contributions.member = plainData.member
    contributions.contributionId = plainData.contributionId
    contributions.status = plainData.status
    contributions.amount = plainData.amount
    contributions.createdAt = plainData.createdAt
    contributions.bankTransferReceipt = plainData.bankTransferReceipt
    contributions.churchId = plainData.churchId
    contributions.financialConcept = FinancialConcept.fromPrimitives(
      plainData.financialConcept
    )
    contributions.observation = plainData.observation
    contributions.bankId = plainData.bankId
    return contributions
  }

  updateStatus(status: OnlineContributionsStatus) {
    this.status = status
  }

  getContributionsId(): string {
    return this.contributionId
  }

  getId(): string {
    return this.id
  }

  getAmount() {
    return this.amount
  }

  getStatus() {
    return this.status
  }

  getCreatedAt() {
    return this.createdAt
  }

  getMember(): Member {
    return this.member
  }

  getBankId() {
    return this.bankId
  }

  toPrimitives() {
    return {
      contributionId: this.contributionId,
      member: this.member,
      status: this.status,
      amount: this.amount,
      createdAt: this.createdAt,
      bankTransferReceipt: this.bankTransferReceipt,
      churchId: this.churchId,
      observation: this.observation,
      financialConcept: this.financialConcept.toPrimitives(),
      bankId: this.bankId,
    }
  }
}
