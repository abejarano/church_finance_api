import { DomainException } from "../../../Shared/domain"

export class InvalidPassword extends DomainException {
  name = "INVALID_PASSWORD"
  message = "Invalid password check and try again"
}
