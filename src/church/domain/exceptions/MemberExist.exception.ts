import { DomainException } from "../../../shared/domain";

export class MemberExist extends DomainException {
  code = "MEMBER_EXIST";
  message = "The member already exist";
}
