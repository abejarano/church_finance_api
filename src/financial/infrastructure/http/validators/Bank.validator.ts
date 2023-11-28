import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../../shared/domain";
import { Validator } from "node-input-validator";

export default async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;

  console.log(`Validando banco ${JSON.stringify(payload)}`);

  const rule = {
    accountType: "required|in:Conta Corrente,Conta Poupança",
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
