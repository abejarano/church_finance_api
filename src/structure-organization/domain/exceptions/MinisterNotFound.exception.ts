import { DomainException } from "../../../shared/domain";

export class MinisterNotFound extends DomainException {
  message = "Minister not found";
  code = "MINISTER_NOT_FOUND";
}
