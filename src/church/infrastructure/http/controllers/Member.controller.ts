import { Response } from "express";
import { MemberRequest } from "../requests/Member.request";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { CreateOrUpdateMember } from "../../../applications/members/CreateOrUpdateMember";
import { MemberMongoRepository } from "../../persistence/MemberMongoRepository";
import { ChurchMongoRepository } from "../../persistence/ChurchMongoRepository";
import { HttpStatus } from "../../../../shared";
import { MemberPaginateRequest } from "../requests/MemberPaginate.request";
import { SearchMember } from "../../../applications/members/SearchMember";

export class MemberController {
  static async createOrUpdate(memberRequest: MemberRequest, res: Response) {
    try {
      await new CreateOrUpdateMember(
        MemberMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
      ).execute(memberRequest);

      res.status(HttpStatus.CREATED).json({ message: "Registered member" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async list(memberRequest: MemberPaginateRequest, res: Response) {
    try {
      const members = await new SearchMember(
        MemberMongoRepository.getInstance(),
      ).execute(memberRequest);

      res.status(HttpStatus.OK).json(members);
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
