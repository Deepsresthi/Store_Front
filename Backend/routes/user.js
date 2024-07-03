import { Router } from "express";
import AuthController from "../controllers/auth.js";
import UserController from "../controllers/user.js";

const router = Router();

router.param("userId", UserController.getUserById);

router.get("/user/:userId", AuthController.isSignedIn, AuthController.isAuthenticated, UserController.getUser);
router.put("/user/:userId", AuthController.isSignedIn, AuthController.isAuthenticated, UserController.updateUser);
router.get("/order/user/:userId", AuthController.isSignedIn, AuthController.isAuthenticated, UserController.userPurchaseList);

export default router;

