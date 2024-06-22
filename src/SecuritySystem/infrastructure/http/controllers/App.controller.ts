import domainResponse from "../../../../Shared/helpers/domainResponse";
import { LoginUserApp } from "../../../applications";
import { UserAppMongoRepository } from "../../persistence/UserAppMongoRepository";
import { PasswordAdapter } from "../../adapters/Password.adapter";
import { HttpStatus } from "../../../../Shared/domain";
import { AuthTokenAdapter } from "../../adapters/AuthToken.adapter";
import { FindChurchById } from "../../../../Church/applications";
import { ChurchMongoRepository } from "../../../../Church/infrastructure";
import { Church } from "../../../../Church/domain";

export class AppController {
  static async loginApp(data: { email: string; password: string }, res) {
    try {
      const userData = await new LoginUserApp(
        UserAppMongoRepository.getInstance(),
        new PasswordAdapter(),
      ).execute(data.email, data.password);

      const church: Church = await new FindChurchById(
        ChurchMongoRepository.getInstance(),
      ).execute(userData.getChurchId());

      const structureReponse = {
        email: userData.getEmail(),
        name: userData.getName(),
        isTreasurer: userData.isTreasurer,
        isMinister: userData.isMinister,
        church: {
          churchId: church.getChurchId(),
          churchName: church.getName(),
        },
      };

      const token = new AuthTokenAdapter().createToken(structureReponse);

      res.status(HttpStatus.OK).send({
        ...structureReponse,
        token: token,
      });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
