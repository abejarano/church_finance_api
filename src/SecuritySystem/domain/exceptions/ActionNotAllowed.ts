import { DomainException } from "../../../Shared/domain";

export class ActionNotAllowed extends DomainException {
  name = "ACTION_NOT_ALLOWED";
  message = "User does not have permission to perform this action";
}
