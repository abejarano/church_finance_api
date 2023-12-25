import { NextFunction, Request, Response } from "express";
import { Validator } from "node-input-validator";
import { HttpStatus } from "../../../../shared/domain";
import { logger } from "../../../../shared/infrastructure";

export default async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;

  logger.info(`Validando contribucion ${JSON.stringify(payload)}`);

  const rule = {
    type: "required|in:OFFERING,TITHE",
    amount: "required|numeric",
    bankTransferReceipt: "required|string",
  };

  const v = new Validator(payload, rule);

  const matched = await v.check();

  if (!matched) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(v.errors);
  }

  next();
};
