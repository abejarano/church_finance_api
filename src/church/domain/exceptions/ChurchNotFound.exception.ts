import { DomainException } from "../../../shared/domain";

export class ChurchNotFound extends DomainException {
  code = "CHURCH_NOT_FOUND";
  message = "The church not found";
}
