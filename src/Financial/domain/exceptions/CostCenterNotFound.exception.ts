import { DomainException } from "../../../Shared/domain";

export class CostCenterNotFound extends DomainException {
  name = "COST_CENTER_NOT_FOUND";
  message = "Cost Center not found";
}
