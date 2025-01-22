import { MemberPaginateRequest, MemberRequest } from "../../../domain";
import domainResponse from "../../../../Shared/helpers/domainResponse";
import {
  CreateOrUpdateMember,
  FindMemberById,
  SearchMembers,
} from "../../../applications";
import { MemberMongoRepository } from "../../persistence/MemberMongoRepository";
import { ChurchMongoRepository } from "../../persistence/ChurchMongoRepository";
import { HttpStatus } from "../../../../Shared/domain";
import { QueueBullService } from "../../../../Shared/infrastructure";

export class MemberController {
  static async createOrUpdate(memberRequest: MemberRequest, res) {
    try {
      await new CreateOrUpdateMember(
        MemberMongoRepository.getInstance(),
        ChurchMongoRepository.getInstance(),
        QueueBullService.getInstance(),
      ).execute(memberRequest);

      res.status(HttpStatus.CREATED).send({ message: "Registered member" });
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async list(memberRequest: MemberPaginateRequest, res) {
    try {
      const members = await new SearchMembers(
        MemberMongoRepository.getInstance(),
      ).execute(memberRequest);

      res.status(HttpStatus.OK).send(members);
    } catch (e) {
      domainResponse(e, res);
    }
  }

  static async findById(memberId: string, res) {
    try {
      const member = await new FindMemberById(
        MemberMongoRepository.getInstance(),
      ).execute(memberId);

      res.status(HttpStatus.OK).send(member);
    } catch (e) {
      domainResponse(e, res);
    }
  }
}
