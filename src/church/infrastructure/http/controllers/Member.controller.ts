import { Response } from "express";
import { MemberRequest } from "../requests/Member.request";
import domainResponse from "../../../../shared/helpers/domainResponse";
import { CreateOrUpdateMember } from "../../../applications/members/CreateOrUpdateMember";
import { MemberMongoRepository } from "../../persistence/MemberMongoRepository";
import { ChurchMongoRepository } from "../../persistence/ChurchMongoRepository";
import { HttpStatus } from "../../../../shared/domain";
import { MemberPaginateRequest } from "../requests/MemberPaginate.request";
import { SearchMember } from "../../../applications/members/SearchMember";
import { FindMemberById } from "../../../applications/members/FindMemberById";
import { NativeEventBus } from "../../../../shared/infrastructure/eventBus/NativeEventBus";

export class MemberController {
  static async createOrUpdate(memberRequest: MemberRequest, res: Response) {
    try {
      await new CreateOrUpdateMember(
        MemberMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
        NativeEventBus.getInstance(),
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

  static async findById(memberId: string, res: Response) {
    try {
      const member = await new FindMemberById(
        MemberMongoRepository.getInstance(),
      ).execute(memberId);

      res.status(HttpStatus.OK).json({ data: member });
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
