import { Router } from "express";
import AuthController from "../controllers/auth.js";
import UserController from "../controllers/user.js";
import CategoryController from "../controllers/category.js";

const router = Router();

router.param("userId", UserController.getUserById);
router.param("categoryId", CategoryController.getCategoryById);


//actual routes
router.post(
    "/category/create/:userId",
    AuthController.isSignedIn,
    AuthController.isAuthenticated, 
    AuthController.isAdmin,
    CategoryController.createCategory
);

router.get("/category/:categoryId", CategoryController.getCategory);
router.get("/category", CategoryController.getAllCategory);

router.put("/category/:categoryId/:userId",
    AuthController.isSignedIn,
    AuthController.isAuthenticated,
    AuthController.isAdmin,
    CategoryController.updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  AuthController.isSignedIn,
  AuthController.isAuthenticated,
  AuthController.isAdmin,
  CategoryController.removeCategory
);


router.put("")
export default router;