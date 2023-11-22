import { DomainException } from "../../../shared";

export class RegionNotFound extends DomainException {
  message = "Region not found";
  code = "REGION_NOT_FOUND";
}
