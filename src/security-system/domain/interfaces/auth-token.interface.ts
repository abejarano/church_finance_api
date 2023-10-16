import { User } from "../user";

export interface IAuthToken {
  createToken(user: any): string;
}
