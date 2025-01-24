import { DomainException } from "../../../Shared/domain"

export class ModuleNotFound extends DomainException {
  name = "MODULE_NOT_FOUND"
  message = "Module not found"
}
