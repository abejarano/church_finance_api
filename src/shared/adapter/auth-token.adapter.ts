import jwt = require("jsonwebtoken");
import { IAuthToken, User, UserAuthDTO } from "../../security-system/domain";

export class AuthTokenAdapter implements IAuthToken {
  createToken(user: User): string {
    const userAuth: UserAuthDTO = {
      userId: user.getUserId(),
      email: user.getEmail(),
      isStaff: user.staff(),
      isSuperuser: user.superUser(),
      profileId: user.getProfileId(),
    };
    return jwt.sign(userAuth, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}
