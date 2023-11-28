export { AuthMiddleware } from "./middleware/auth.middleware";
export { AppServer } from "./server";
export * from "./mongodb/index";

export const logger = new CustomLogger();

import { CustomLogger } from "./custom-logger";
