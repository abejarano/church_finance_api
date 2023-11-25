import { DomainException } from "../../../shared";

export class CostCenterNotFound extends DomainException {
  name = "COST_CENTER_NOT_FOUND";
  message = "Cost Center not found";
}
