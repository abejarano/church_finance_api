import { HttpStatus } from '../../../../Shared/domain'
import { Validator } from 'node-input-validator'
import { logger } from '../../../../Shared/infrastructure'

export default async (req, res) => {
  const payload = req.body

  logger.info(`Validando registro de ministros ${JSON.stringify(payload)}`)

  const rule = {
    name: 'required',
    email: 'required|email',
    phone: 'required',
    dni: 'required',
    ministerType: 'required|in:Reverendo,Diácono,Obrero',
    regionId: 'required',
  }

  const v = new Validator(payload, rule)

  const matched = await v.check()

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors)
  }
}
