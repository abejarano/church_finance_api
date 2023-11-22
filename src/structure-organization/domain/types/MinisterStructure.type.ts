import { MinisterType } from "../enums/minister-type.enum";

export type MinisterStructureType = {
  name: string;
  email: string;
  phone: string;
  dni: string;
  ministerType: MinisterType;
  regionId: string;
};
