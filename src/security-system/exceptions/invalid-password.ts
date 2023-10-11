import { DomainException } from "../../shared";

export class InvalidPassword extends DomainException {
  name = "invalid_password";
  message = "Invalid password check and try again";
}
