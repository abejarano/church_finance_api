import { logger } from "../index";

export const PubsubMiddleware = async (req, res, next) => {
  if (!req.body) {
    const msg = "no Pub/Sub message received";
    logger.error(`ERROR: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }
  if (!req.body.message) {
    const msg = "invalid Pub/Sub message format";
    logger.error(`ERROR: ${msg}`);
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }

  const buff = Buffer.from(req.body.message.data, "base64");
  req.body = JSON.parse(buff.toString("utf-8"));

  next();
};
