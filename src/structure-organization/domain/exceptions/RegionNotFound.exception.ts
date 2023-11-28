import { DomainException } from "../../../shared/domain";

export class RegionNotFound extends DomainException {
  message = "Region not found";
  code = "REGION_NOT_FOUND";
}
