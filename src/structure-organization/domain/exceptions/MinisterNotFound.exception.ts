import { DomainException } from "../../../shared";

export class MinisterNotFound extends DomainException {
  message = "Minister not found";
  code = "MINISTER_NOT_FOUND";
}
