import cors = require("cors")
import express = require("express")
import fileUpload = require("express-fileupload")
import bodyParser = require("body-parser")
import rateLimit from "express-rate-limit"

export function server(port: number) {
  const app = express()
  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.disable("x-powered-by")

  const corsOptions = {
    origin: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }

  app.use(cors(corsOptions))

  app.options("*", cors(corsOptions))

  const limiter = rateLimit({
    windowMs: 8 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => {
      // Excluye las rutas de @bull-board/express
      return req.originalUrl.startsWith("/admin/queues")
    },
  })

  app.use(limiter)

  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  )

  app.set("port", port)

  return app
}
