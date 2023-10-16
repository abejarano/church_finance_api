import { MinisterType } from "../../../church/domain";

export type MinisterStructureType = {
  name: string;
  email: string;
  phone: string;
  dni: string;
  ministerType: MinisterType;
  regionId: string;
};
