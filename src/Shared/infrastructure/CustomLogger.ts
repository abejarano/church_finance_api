import pino, { Logger } from "pino"
import { v4 } from "uuid"

export class CustomLogger {
  private logger: Logger
  private codeHash: string

  constructor() {
    this.logger = pino({
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
          colorize: true,
        },
      },
      //logEvents: ["log"],
      serializers: {
        req: (req) => ({ raw: req }),
        res: (res) => ({ raw: res }),
      },
    })
    this.codeHash = process.env.requestId ?? v4()

    this.logger.info(
      { environment: process.env.NODE_ENV },
      "Logger inicializado"
    )
  }

  info(message: any, args?: object): void {
    args = { ...args, requestId: this.codeHash }
    this.logger.info(args, message)
  }

  error(message: any, args?: object): void {
    args = { ...args, requestId: this.codeHash }
    this.logger.error(args, message)
  }
}
