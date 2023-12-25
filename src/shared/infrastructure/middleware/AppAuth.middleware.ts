import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");

export const AppAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    req["member"] = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token não é válido." });
  }
};
