import { HttpStatus } from "../../../../Shared/domain";
import { Validator } from "node-input-validator";

export default async (req, res, next) => {
  const payload = req.body;

  console.log(`Validando banco ${JSON.stringify(payload)}`);

  const rule = {
    accountType: "required|in:BANK,CASH,WALLET,INVESTMENT",
    active: "required|boolean",
    churchId: "required",
    accountName: "required|string",
  };

  const v = new Validator(payload, rule);

  const matched = await v.check();

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors);
  }

  next();
};
