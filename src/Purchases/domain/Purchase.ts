import { AggregateRoot } from '../../Shared/domain'

export class Purchase extends AggregateRoot {
  private id?: string
  private churchId: string
  private createdAt: Date
  private amount: number
  private invoice: string
  private items: Array<{
    quantity: number
    price: number
  }>

  getId(): string {
    return this.id
  }

  toPrimitives() {
    throw new Error('Method not implemented.')
  }
}
