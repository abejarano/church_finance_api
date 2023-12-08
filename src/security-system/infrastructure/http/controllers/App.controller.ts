import { Response } from "express";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { LoginUserApp } from "../../../applications/LoginUserApp";
import { UserAppMongoRepository } from "../../persistence/UserAppMongoRepository";
import { PasswordAdapter } from "../../adapters/Password.adapter";
import { HttpStatus } from "../../../../shared/domain";
import { AuthTokenAdapter } from "../../adapters/AuthToken.adapter";

export class AppController {
  static async loginApp(
    data: { email: string; password: string },
    res: Response,
  ) {
    try {
      const userData = await new LoginUserApp(
        UserAppMongoRepository.getInstance(),
        new PasswordAdapter(),
      ).execute(data.email, data.password);

      const token = new AuthTokenAdapter().createToken(userData);

      res.status(HttpStatus.CREATED).json({
        data: {
          email: userData.email,
          name: userData.name,
          isTreasurer: userData.isTreasurer,
          isMinister: userData.isMinister,
          token: token,
        },
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
