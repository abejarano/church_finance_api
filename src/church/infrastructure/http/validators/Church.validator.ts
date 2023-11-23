import { NextFunction, Response, Request } from "express";
import { HttpStatus, logger } from "../../../../shared";
import { Validator } from "node-input-validator";

export default async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;

  logger.info(`Validando iglesia ${JSON.stringify(payload)}`);

  const rule = {
    name: "required|maxLength:150",
    city: "required",
    address: "required|maxLength:80",
    street: "required|maxLength:40",
    number: "required",
    postalCode: "required|minLength:7|maxLength:10",
    email: "required|email",
    openingDate: "required|dateFormat:YYYY-MM-DD",
    regionId: "required",
  };

  const v = new Validator(payload, rule);

  const matched = await v.check();

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors);
  }

  next();
};
