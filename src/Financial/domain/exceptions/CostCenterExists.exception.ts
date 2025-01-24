import { DomainException } from "../../../Shared/domain"

export class CostCenterExists extends DomainException {
  name = "COST_CENTER_EXISTS"
  message = "The cost center is already registered"
}
