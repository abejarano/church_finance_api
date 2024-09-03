import domainResponse from "../../../../Shared/helpers/domainResponse";
import { LoginUserApp } from "../../../applications";
import { UserAppMongoRepository } from "../../persistence/UserAppMongoRepository";
import { PasswordAdapter } from "../../adapters/Password.adapter";
import { HttpStatus } from "../../../../Shared/domain";
import { AuthTokenAdapter } from "../../adapters/AuthToken.adapter";
import {
  FindChurchById,
  FindMemberById,
} from "../../../../Church/applications";
import {
  ChurchMongoRepository,
  MemberMongoRepository,
} from "../../../../Church/infrastructure";
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

      const member = await new FindMemberById(
        MemberMongoRepository.getInstance(),
      ).execute(userData.getMemberId());

      const structureReponse = {
        email: member.getEmail(),
        name: member.getName(),
        memberId: member.getMemberId(),
        phone: member.getPhone(),
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
