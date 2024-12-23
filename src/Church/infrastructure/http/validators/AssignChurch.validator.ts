import { Validator } from "node-input-validator";
import { HttpStatus } from "../../../../Shared/domain";

export default async (req, res) => {
  const payload = req.body;
  console.log(`Validando asignacion de iglesia ${JSON.stringify(payload)}`);

  const rule = {
    churchId: "required",
    ministerId: "required",
  };

  const v = new Validator(payload, rule);

  const matched = await v.check();

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors);
  }

  return true;
};
