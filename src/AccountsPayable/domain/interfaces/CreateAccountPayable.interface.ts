import { ProviderType } from "../enums/ProviderType"
import { Installments } from "@/Shared/domain"

export interface ICreateAccountPayable {
  provider: {
    providerType: ProviderType
    providerDNI: string
    name: string
    phone: string
  }
  accountPayableId?: string
  churchId: string
  description: string
  amountTotal: number
  amountPaid?: number
  amountPending?: number
  installments?: Installments[]
}
