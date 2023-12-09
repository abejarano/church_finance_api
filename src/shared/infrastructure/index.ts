import { CustomLogger } from "./custom-logger";

export { AuthMiddleware } from "./middleware/Auth.middleware";
export { AppServer } from "./server";
export * from "./mongodb/index";

export const logger = new CustomLogger();
