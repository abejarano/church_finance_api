import { Validator } from "node-input-validator";
import { HttpStatus } from "../../../../Shared/domain";
import { logger } from "../../../../Shared/infrastructure";

export default async (req, res, next) => {
  const payload = req.body;

  logger.info(`Validando registro financiero`, payload);

  const rule = {
    amount: "required|numeric",
    financeConceptId: "required|string",
    bankId: "requiredIf:moneyLocation,BANK|string",
    date: "required|dateFormat:YYYY-MM-DD",
    moneyLocation: "required|string|in:BANK,CASH,WALLET,INVESTMENT",
  };

  const customMessage = {
    "moneyLocation.in":
      "Invalid value, accepted values are: BANK, CASH, WALLET, INVESTMENT.",
  };

  const v = new Validator(payload, rule, customMessage);

  const matched = await v.check();

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors);
  }

  next();
};
