import { DomainException } from "../../shared/domain";

export class UserNotFound extends DomainException {
  name = "user_not_exists";

  constructor(email: string) {
    super();
    this.message = `User with email ${email} was not found in the system.`;
  }
}
