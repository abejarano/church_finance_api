import domainResponse from "../../../../Shared/helpers/domainResponse";
import { LoginUserApp } from "../../../applications";
import { UserAppMongoRepository } from "../../persistence/UserAppMongoRepository";
import { PasswordAdapter } from "../../adapters/Password.adapter";
import { HttpStatus } from "../../../../Shared/domain";
import { AuthTokenAdapter } from "../../adapters/AuthToken.adapter";

export class AppController {
  static async loginApp(data: { email: string; password: string }, res) {
    try {
      const userData = await new LoginUserApp(
        UserAppMongoRepository.getInstance(),
        new PasswordAdapter(),
      ).execute(data.email, data.password);

      const token = new AuthTokenAdapter().createToken(userData);

      res.status(HttpStatus.OK).send({
        email: userData.email,
        name: userData.name,
        isTreasurer: userData.isTreasurer,
        isMinister: userData.isMinister,
        token: token,
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
