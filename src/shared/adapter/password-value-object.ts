import { encrypt, GenericException } from "../index";

export class PasswordValueObject {
  constructor(private readonly passwordPlain: string) {
    if (passwordPlain.length < 8) {
      throw new GenericException("The min required len is 8 character");
    }
  }

  static instance(passwordPlain: string) {
    return new PasswordValueObject(passwordPlain);
  }

  static fromPrimitive(passwordHash: string): PasswordValueObject {
    return new PasswordValueObject(passwordHash);
  }

  getValue(): string {
    return this.passwordPlain;
  }

  async getValueEncrypt(): Promise<string> {
    return await encrypt(this.passwordPlain);
  }
}
