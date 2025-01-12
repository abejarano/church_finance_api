import { Profile } from "../types/profile.type";

export type CreateUserRequest = {
  userId?: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  profiles: Profile[];
  churchId: string;
};
