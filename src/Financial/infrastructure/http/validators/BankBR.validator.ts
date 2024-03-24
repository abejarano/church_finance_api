import { HttpStatus } from "../../../../Shared/domain";
import { Validator } from "node-input-validator";

export default async (req, res, next) => {
  const payload = req.body;

  console.log(`Validando banco ${JSON.stringify(payload)}`);

  const rule = {
    bankInstruction: "required|object",
    "bankInstruction.codeBank": "required|string|maxLength:3",
    "bankInstruction.agency": "required|string|maxLength:4",
    "bankInstruction.account": "required|string|maxLength:10",
  };

  const v = new Validator(payload, rule);

  const matched = await v.check();

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors);
  }

  next();
};
