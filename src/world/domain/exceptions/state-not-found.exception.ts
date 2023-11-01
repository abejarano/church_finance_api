import { DomainException } from "../../../shared";

export class StateNotFound extends DomainException {
  message = "State not found";
  code = "STATE_NOT_FOUND";
}
