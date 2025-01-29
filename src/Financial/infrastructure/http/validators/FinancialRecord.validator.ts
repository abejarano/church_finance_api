import { Validator } from "node-input-validator"
import { HttpStatus } from "../../../../Shared/domain"
import { Logger } from "../../../../Shared/adapter"

export default async (req, res, next) => {
  const payload = req.body
  const logger = Logger("FinancialRecordValidator")

  logger.info(`Validando registro financiero`, payload)

  const rule = {
    amount: "required|numeric",
    financialConceptId: "required|string",
    date: "required|dateFormat:YYYY-MM-DD",
    availabilityAccountId: "required|string",
  }

  const v = new Validator(payload, rule)

  const matched = await v.check()

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors)
  }

  next()
}
