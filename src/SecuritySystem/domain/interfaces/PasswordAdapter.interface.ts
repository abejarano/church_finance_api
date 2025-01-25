export interface IPasswordAdapter {
  encrypt(passwordPlain: string): Promise<string>

  check(password: string, passwordHash: string): Promise<boolean>
}
