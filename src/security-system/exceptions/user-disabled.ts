import { DomainException } from "../../shared/domain";

export class UserDisabled extends DomainException {
  name = "user_disable";

  constructor(email: string) {
    super();
    this.message = `User with email ${email} fue deshabilitado en la plataforma.`;
  }
}
