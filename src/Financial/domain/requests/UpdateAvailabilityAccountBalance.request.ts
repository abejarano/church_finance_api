export type UpdateAvailabilityAccountBalanceRequest = {
  availabilityAccountId: string
  amount: number
  operationType: "MONEY_IN" | "MONEY_OUT"
}
