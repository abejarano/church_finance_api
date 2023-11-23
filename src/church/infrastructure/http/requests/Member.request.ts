export type MemberRequest = {
  memberId?: string;
  name: string;
  email: string;
  phone: string;
  dni: string;
  conversionDate: Date;
  baptismDate?: Date;
  churchId: string;
  birthdate: Date;
};
