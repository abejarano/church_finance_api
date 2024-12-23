import { CustomLogger } from "./custom-logger";

export { AppAuthMiddleware } from "./middleware/AppAuth.middleware";
export { server } from "./http/server";
export * from "./mongodb/index";

export { PermissionMiddleware } from "./middleware/Permission.middleware";

export const logger = new CustomLogger();
