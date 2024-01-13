import jwt = require("jsonwebtoken");
import { IAuthToken } from "../../domain";

export class AuthTokenAdapter implements IAuthToken {
  createToken(user: any): string {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}
