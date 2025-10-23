import { Installments, InstallmentsStatus } from "@/Shared/domain"

export const PayInstallment = (
  installment: Installments,
  amountTransferred: number,
  financialTransactionId: string,
  logger: any
): number => {
  if (installment.status === InstallmentsStatus.PAID) {
    logger.debug(`Installment ${installment.installmentId} already paid`)
    return amountTransferred
  }

  const previousStatus =
    installment.status ?? InstallmentsStatus.PENDING

  logger.info(
    `Installment ${installment.installmentId} is was ${previousStatus.toLowerCase()} payment`
  )

  const totalAmount = installment.amount
  const previousAmountPaid =
    installment.amountPaid ?? totalAmount - (installment.amountPending ?? totalAmount)
  const normalizedPreviousAmountPaid = Math.max(previousAmountPaid, 0)

  const previousAmountPending =
    installment.amountPending ?? Math.max(totalAmount - normalizedPreviousAmountPaid, 0)

  const amountToPay = Math.min(amountTransferred, previousAmountPending)
  const newAmountPaid = Math.min(
    normalizedPreviousAmountPaid + amountToPay,
    totalAmount
  )
  const newAmountPending = Math.max(totalAmount - newAmountPaid, 0)

  installment.amountPaid = newAmountPaid
  installment.amountPending = newAmountPending
  installment.status =
    newAmountPending === 0
      ? InstallmentsStatus.PAID
      : InstallmentsStatus.PARTIAL

  installment.financialTransactionId = financialTransactionId

  logger.info(`Installment ${installment.installmentId} updated`, installment)

  return amountTransferred - amountToPay
}
