import { GenericException } from "../domain";
import { encrypt } from "../helpers";

export class PasswordAdapter {
  constructor(private readonly passwordPlain: string) {
    if (passwordPlain.length < 6) {
      throw new GenericException("The min required len is 8 character");
    }
  }

  static instance(passwordPlain: string) {
    return new PasswordAdapter(passwordPlain);
  }

  static fromPrimitive(passwordHash: string): PasswordAdapter {
    return new PasswordAdapter(passwordHash);
  }

  getValue(): string {
    return this.passwordPlain;
  }

  async getValueEncrypt(): Promise<string> {
    return await encrypt(this.passwordPlain);
  }
}
