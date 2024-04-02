import { ChurchStatus } from "../../../domain";

export type ChurchRequest = {
  churchId?: string;
  name: string;
  city: string;
  address: string;
  street: string;
  number: string;
  postalCode: string;
  registerNumber?: string;
  email: string;
  openingDate: Date;
  regionId: string;
  status: ChurchStatus;
};
