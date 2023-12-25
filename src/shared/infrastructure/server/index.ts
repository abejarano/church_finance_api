import cors = require("cors");
import express = require("express");
import bodyParser = require("body-parser");
import fileUpload = require("express-fileupload");
import rateLimit from "express-rate-limit";

export function AppServer(port = 8080) {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.disable("x-powered-by");

  const corsOptions = {
    origin: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));

  app.options("*", cors(corsOptions));

  const limiter = rateLimit({
    windowMs: 8 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(limiter);

  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }),
  );

  app.set("port", port);

  return app;
}
