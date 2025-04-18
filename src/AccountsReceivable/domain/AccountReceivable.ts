import { DebtorType } from "./enums/DebtorType.enum"
import { AccountsReceivableStatus } from "./enums/AccountsReceivableStatus.enum"

import { IdentifyEntity } from "@/Shared/adapter"
import { DateBR } from "@/Shared/helpers"
import { ICreateAccountReceivable } from "./interfaces/CreateAccountReceivable.interface"

import {
  AggregateRoot,
  AmountValue,
  Installments,
  InstallmentsStatus,
} from "@/Shared/domain"

export class AccountReceivable extends AggregateRoot {
  protected amountTotal: number
  protected amountPaid: number
  private id?: string
  private debtor: {
    debtorType: DebtorType
    debtorDNI: string
    name: string
    phone: string
  }
  private accountReceivableId: string
  private churchId: string
  private description: string
  private amountPending: number
  private status: AccountsReceivableStatus
  private installments: Installments[]
  private createdAt: Date
  private updatedAt: Date

  static create(params: Partial<ICreateAccountReceivable>): AccountReceivable {
    const {
      debtor,
      churchId,
      description,
      amountPaid,
      amountPending,
      installments,
    } = params

    const accountReceivable: AccountReceivable = new AccountReceivable()
    accountReceivable.accountReceivableId =
      IdentifyEntity.get(`accountReceivable`)
    accountReceivable.churchId = churchId
    accountReceivable.description = description

    accountReceivable.amountPaid = amountPaid
    accountReceivable.amountPending = amountPending
    accountReceivable.status = AccountsReceivableStatus.PENDING

    let amountTotal: number = 0
    accountReceivable.installments = installments.map((i) => {
      amountTotal += Number(i.amount)

      return {
        ...i,
        dueDate: new Date(i.dueDate),
        installmentId: i.installmentId || IdentifyEntity.get(`installment`),
        status: InstallmentsStatus.PENDING,
      }
    })

    accountReceivable.amountTotal = amountTotal
    accountReceivable.amountPaid = 0
    accountReceivable.amountPending = accountReceivable.amountTotal

    accountReceivable.createdAt = DateBR()
    accountReceivable.updatedAt = DateBR()

    if (debtor) {
      accountReceivable.debtor = {
        phone: debtor.phone,
        debtorType: debtor.debtorType,
        debtorDNI: debtor.debtorDNI || IdentifyEntity.get(`debtor`),
        name: debtor.name,
      }
    }

    return accountReceivable
  }

  static fromPrimitives(params: any): AccountReceivable {
    const accountReceivable: AccountReceivable = new AccountReceivable()
    accountReceivable.id = params.id
    accountReceivable.installments = params.installments
    accountReceivable.accountReceivableId = params.accountReceivableId
    accountReceivable.churchId = params.churchId
    accountReceivable.description = params.description
    accountReceivable.amountTotal = params.amountTotal
    accountReceivable.amountPaid = params.amountPaid
    accountReceivable.amountPending = params.amountPending
    accountReceivable.status = params.status
    accountReceivable.createdAt = params.createdAt
    accountReceivable.updatedAt = params.updatedAt
    accountReceivable.debtor = params.debtor

    return accountReceivable
  }

  getId(): string {
    return this.id
  }

  getInstallment(installmentId: string): Installments {
    return this.installments.find((i) => i.installmentId === installmentId)
  }

  updateAmount(amountPaid: AmountValue) {
    this.amountPaid += amountPaid.getValue()
    this.amountPending -= amountPaid.getValue()

    if (this.amountPending === 0) {
      this.status = AccountsReceivableStatus.PAID
    }

    this.updatedAt = DateBR()
  }

  getAmountPending() {
    return this.amountPending
  }

  getStatus() {
    return this.status
  }

  toPrimitives() {
    return {
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      debtor: {
        ...this.debtor,
      },
      accountReceivableId: this.accountReceivableId,
      churchId: this.churchId,
      description: this.description,
      amountTotal: this.amountTotal,
      amountPaid: this.amountPaid,
      amountPending: this.amountPending,
      installments: this.installments,
    }
  }
}
