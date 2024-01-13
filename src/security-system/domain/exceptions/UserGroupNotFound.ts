import { DomainException } from "../../../shared/domain";

export class UserGroupNotFound extends DomainException {
  name = "PROFILE_NOT_FOUND";
  message = "profile not found";
}
