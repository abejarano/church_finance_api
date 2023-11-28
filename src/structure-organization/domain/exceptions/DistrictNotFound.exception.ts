import { DomainException } from "../../../shared/domain";

export class DistrictNotFound extends DomainException {
  message = "District not found";
  code = "DISTRICT_NOT_FOUND";
}
