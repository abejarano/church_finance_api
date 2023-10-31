import { NextFunction, Response, Request } from "express";
import { HttpStatus, logger } from "../../../../shared";
import { Validator } from "node-input-validator";

export default async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;

  logger.info(`Validando distrito ${JSON.stringify(payload)}`);

  const rule = {
    name: "required",
    registerName: "required",
    stateId: "required",
  };

  const v = new Validator(payload, rule);

  const matched = await v.check();

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors);
  }

  next();
};
