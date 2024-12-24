export type CreateUserRequest = {
  userId: string;
  name: string;
  email: string;
  password: string;
  isSuperuser: boolean;
  isActive: boolean;
  profileId: string[];
  churchId: string;
};
