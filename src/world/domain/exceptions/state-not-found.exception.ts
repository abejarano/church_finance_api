import { DomainException } from "../../../shared/domain";

export class StateNotFound extends DomainException {
  message = "State not found";
  code = "STATE_NOT_FOUND";
}
