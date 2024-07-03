import { Router } from "express";
import AuthController from "../controllers/auth.js";
import UserController from "../controllers/user.js";
import ProductController from "../controllers/product.js";
const router = Router();

router.param("userId", UserController.getUserById);
router.param("productId", ProductController.getProductById);

//actual routes
router.post("/product/create/:userId",
    AuthController.isSignedIn,
    AuthController.isAuthenticated,
    AuthController.isAdmin,
    ProductController.createProduct
);

// read routes
router.get("/product/:productId", ProductController.getProduct);
router.get("/product/photo/:productId", ProductController.photo);

//delete route
router.delete(
  "/product/:productId/:userId",
  AuthController.isSignedIn,
  AuthController.isAuthenticated,
  AuthController.isAdmin,
  ProductController.deleteProduct
);

//update route
router.put(
  "/product/:productId/:userId",
  AuthController.isSignedIn,
  AuthController.isAuthenticated,
  AuthController.isAdmin,
  ProductController.updateProduct
);

//listing route
router.get("/products", ProductController.getAllProducts);

router.get("/products/categories", ProductController.getAllUniqueCategories);


export default router;