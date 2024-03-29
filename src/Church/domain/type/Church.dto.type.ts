export type ChurchDTO = {
  address: string;
  churchId: string;
  city: string;
  createdAt: string;
  email: string;
  name: string;
  number: string;
  openingDate: string;
  postalCode: string;
  region: {
    regionId: string;
    name: string;
  };
  street: string;
};
