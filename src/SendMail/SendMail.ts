import { IQueue } from "../Shared/domain"
import { Mail } from "./types/mail.type"
import { SendMailService } from "./service/SendMail.service"

export class SendMail implements IQueue {
  async handle(args: any): Promise<void> {
    const payload = args as Mail

    console.log(
      `[SENDMAIL] Sending email to ${payload.to}, subject ${payload.subject}`
    )

    await SendMailService(payload)
  }
}
