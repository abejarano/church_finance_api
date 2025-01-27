import { logger } from "../../Shared/infrastructure"
import { APP_DIR } from "../../app"
import hbs = require("nodemailer-express-handlebars")

export default async (transport: any) => {
  logger.info(`[EMAIL] Configuración del motor de template`)

  //const hbs = await import("nodemailer-express-handlebars")

  console.log(`${APP_DIR}/SendMail/templates`)
  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: `${APP_DIR}/SendMail/templates`,
      layoutsDir: `${APP_DIR}/SendMail/templates`,
      defaultLayout: "base",
    },
    viewPath: `${APP_DIR}/SendMail/templates`,
    extName: ".hbs",
  }
  const configHbs = hbs(handlebarOptions)

  transport.use("compile", configHbs)
}
