import { CustomLogger } from "./custom-logger";

export { AppAuthMiddleware } from "./middleware/AppAuth.middleware";
export * from "./mongodb/index";

export const logger = new CustomLogger();
