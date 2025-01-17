import { AggregateRoot } from "../../Shared/domain"
import { AccountType, AvailabilityAccount } from "../../Financial/domain"

export class Purchase extends AggregateRoot {
  private id?: string
  private financialConceptId: string
  private churchId: string
  private purchaseDate: Date
  private total: number
  private tax: number
  private description: string
  private invoice: string
  private availabilityAccount: {
    accountName: string
    accountType: AccountType
  }
  private items: Array<{
    quantity: number
    price: number
    name: string
  }>

  static create(
    financialConceptId: string,
    churchId: string,
    purchaseDate: Date,
    total: number,
    subTotal: number,
    tax: number,
    description: string,
    invoice: string,
    availabilityAccount: AvailabilityAccount,
    items: Array<{
      quantity: number
      price: number
      name: string
    }>
  ): Purchase {
    const p: Purchase = new Purchase()

    p.financialConceptId = financialConceptId
    p.churchId = churchId
    p.purchaseDate = purchaseDate
    p.total = total
    p.tax = tax
    p.description = description
    p.invoice = invoice
    p.availabilityAccount = {
      accountName: availabilityAccount.getAccountName(),
      accountType: availabilityAccount.getType(),
    }
    p.items = items

    return p
  }

  static fromPrimitives(plainData: any): Purchase {
    const p: Purchase = new Purchase()

    p.id = plainData.id
    p.financialConceptId = plainData.financialConceptId
    p.churchId = plainData.churchId
    p.purchaseDate = plainData.purchaseDate
    p.total = plainData.total
    p.tax = plainData.tax
    p.description = plainData.description
    p.invoice = plainData.invoice
    p.availabilityAccount = plainData.availabilityAccount
    p.items = plainData.items

    return p
  }

  getId(): string {
    return this.id
  }

  toPrimitives() {
    return {
      financialConceptId: this.financialConceptId,
      churchId: this.churchId,
      purchaseDate: this.purchaseDate,
      total: this.total,
      tax: this.tax,
      description: this.description,
      invoice: this.invoice,
      availabilityAccount: this.availabilityAccount,
      items: this.items,
    }
  }
}
