import { Validator } from "node-input-validator"
import { HttpStatus } from "../../../../Shared/domain"
import { Logger } from "../../../../Shared/adapter"

export default async (req, res) => {
  const logger = Logger("AssingChurchValidator")

  const payload = req.body
  logger.info(`Validando asignacion de iglesia ${JSON.stringify(payload)}`)

  const rule = {
    churchId: "required",
    ministerId: "required",
  }

  const v = new Validator(payload, rule)

  const matched = await v.check()

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors)
  }

  return true
}
