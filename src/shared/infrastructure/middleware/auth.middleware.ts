import { Request, Response, NextFunction } from "express";
import jwt = require("jsonwebtoken");

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    req["user"] = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token não é válido." });
  }
};
