import jwt = require("jsonwebtoken");
import { IAuthToken, User } from "../../security-system/domain";

export class AuthTokenAdapter implements IAuthToken {
  createToken(user: User): string {
    return jwt.sign(user.toPrimitives(), process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}
