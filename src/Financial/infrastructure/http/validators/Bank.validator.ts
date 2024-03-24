import { HttpStatus } from "../../../../Shared/domain";
import { Validator } from "node-input-validator";

export default async (req, res, next) => {
  const payload = req.body;

  console.log(`Validando banco ${JSON.stringify(payload)}`);

  const rule = {
    accountType: "required|in:CURRENT,SAVINGS,PAYMENT,SALARY",
    active: "required|boolean",
    churchId: "required",
    name: "required|string",
    tag: "required|string",
    addressInstancePayment: "required|string",
    bankInstruction: "required|object",
  };

  const v = new Validator(payload, rule);

  const matched = await v.check();

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors);
  }

  next();
};
