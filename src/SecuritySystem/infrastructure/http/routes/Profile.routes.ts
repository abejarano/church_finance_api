import { Router } from "express";
import { PermissionMiddleware } from "../../../../Shared/infrastructure";
import { ProfileController } from "../controllers/dashboard/Profile.controller";
import { CreateProfileRequest } from "../../../domain";

const profileRoutes = Router();

profileRoutes.post("/", PermissionMiddleware, async (req, res) => {
  await ProfileController.createProfile(
    req.body as unknown as CreateProfileRequest,
    res,
  );
});

profileRoutes.get("/", PermissionMiddleware, async (req, res) => {
  await ProfileController.fetchAllProfile(res);
});

profileRoutes.get("/:profileId", PermissionMiddleware, async (req, res) => {
  const { profileId } = req.params as any;
  await ProfileController.findByProfileId(profileId, res);
});

export default profileRoutes;
