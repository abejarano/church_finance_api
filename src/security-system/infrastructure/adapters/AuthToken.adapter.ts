import jwt = require("jsonwebtoken");
import { IAuthToken } from "../../domain";
import * as process from "process";

export class AuthTokenAdapter implements IAuthToken {
  createToken(user: any): string {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}
