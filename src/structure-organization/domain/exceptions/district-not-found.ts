import { DomainException } from "../../../shared";

export class DistrictNotFound extends DomainException {
  message = "District not found";
  code = "DISTRICT_NOT_FOUND";
}
