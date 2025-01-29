import nodemailer = require("nodemailer")
import * as process from "process"

import configEngineHTML from "./ConfigEngineHTML.service"
import { Mail } from "../types/mail.type"
import { Logger } from "../../Shared/adapter"

const configTransportMail = async () => {
  const logger = Logger("configTransportMail")

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "angel.bejarano@jaspesoft.com",
      serviceClient: process.env.SEND_MAIL_CLIENT_ID,
      privateKey: process.env.SEND_MAIL_PRIVATE_KEY,
    },
  })

  try {
    await transporter.verify()

    await configEngineHTML(transporter)

    return transporter
  } catch (error) {
    logger.error(`${error}`)
    throw error
  }
}

export const SendMailService = async (payload: Mail) => {
  const logger = Logger("SendMailService")

  const transport = await configTransportMail()

  logger.info(`[EMAIL] Configuraciones del email`)

  const HelperOptions = {
    to: payload.to,
    subject: payload.subject,
    template: `${payload.template}`,
    context: {
      ...payload.context,
      client: payload.clientName,
      year: new Date().getFullYear(),
    },
  }

  logger.info(
    `[EMAIL] Enviando email a ${payload.to}, subject ${
      payload.subject
    } template ${payload.template}, context
      ${JSON.stringify(HelperOptions.context)}`
  )

  await transport.sendMail(HelperOptions)

  logger.info(`[EMAIL] Correo enviado con exito`)
}
