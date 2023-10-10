import { DomainException } from "./domain_exception";

export class GenericException extends DomainException {
  name = "generic_exception";

  constructor(message: string) {
    super();
    this.message = message;
  }
}
