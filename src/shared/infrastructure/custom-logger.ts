import pino, { Logger } from "pino";
import { v4 } from "uuid";

export class CustomLogger {
  private logger: Logger;
  private codeHash: string;

  constructor(options?: pino.LoggerOptions) {
    this.logger = pino(options);
    this.codeHash = process.env.requestId ?? v4();
  }

  setCode(code: string) {
    this.codeHash = code;
  }

  info(message: any, ...args: any[]): void {
    const modifiedMessage = `[${this.codeHash}] ${message}`;
    this.logger.info(modifiedMessage, ...args);
  }

  error(message: any, ...args: any[]): void {
    const modifiedMessage = `[${this.codeHash}] ${message}`;
    this.logger.error(modifiedMessage, ...args);
  }
}
