import { checkPassword, encrypt } from "../../../shared/helpers";
import { IPasswordAdapter } from "../../domain";

export class PasswordAdapter implements IPasswordAdapter {
  async encrypt(passwordPlain: string): Promise<string> {
    return await encrypt(passwordPlain);
  }

  async check(password: string, passwordHash: string): Promise<boolean> {
    return await checkPassword(password, passwordHash);
  }
}
