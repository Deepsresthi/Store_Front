import { Router } from "express";
import AuthController from "../controllers/auth.js";
import UserController from "../controllers/user.js";

const router = Router();

router.param("userId", UserController.getUserById);

router.get("/user/:userId", AuthController.isSignedIn, AuthController.isAuthenticated, UserController.getUser);

export default router;

