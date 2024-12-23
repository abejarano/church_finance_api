import { Router } from "express";
import {
  UserController,
  userLoginPayload,
} from "../controllers/dashboard/user.controller";
import { CreateUserRequest, FilterUserRequest } from "../../../domain";
import { PermissionMiddleware } from "../../../../Shared/infrastructure";

const userRoutes = Router();

userRoutes.get("/", PermissionMiddleware, async (req, res) => {
  await UserController.fetchAllUser(
    req.query as unknown as FilterUserRequest,
    res,
  );
});

userRoutes.post("/create", PermissionMiddleware, async (req, res) => {
  await UserController.createOrUpdateUser(
    req.body as unknown as CreateUserRequest,
    res,
  );
});

userRoutes.put("/edit-user/:userId", PermissionMiddleware, async (req, res) => {
  const { userId } = req.params as any;
  await UserController.createOrUpdateUser(
    { ...(req.body as unknown as CreateUserRequest), userId: userId },
    res,
  );
});

userRoutes.post("/login", async (req, res) => {
  await UserController.login(req.body as unknown as userLoginPayload, res);
});

export default userRoutes;
