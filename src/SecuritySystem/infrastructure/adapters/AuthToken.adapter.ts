import jwt = require("jsonwebtoken");
import { IAuthToken } from "../../domain";

type dataForToken = {
  email: string;
  name: string;
  isTreasurer: boolean;
  isMinister: boolean;
  church: {
    churchId: string;
    churchName: string;
  };
};

export class AuthTokenAdapter implements IAuthToken {
  createToken(user: dataForToken): string {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}
