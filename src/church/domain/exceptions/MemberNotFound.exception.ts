import { DomainException } from "../../../shared";

export class MemberNotFound extends DomainException {
  code = "MEMBER_NOT_FOUND";
  message = "The member not found";
}
