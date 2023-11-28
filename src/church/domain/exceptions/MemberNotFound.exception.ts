import { DomainException } from "../../../shared/domain";

export class MemberNotFound extends DomainException {
  code = "MEMBER_NOT_FOUND";
  message = "The member not found";
}
