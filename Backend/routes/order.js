import { Router } from "express";
import AuthController from "../controllers/auth.js";
import UserController from "../controllers/user.js";
import ProductController from "../controllers/product.js";
import OrderController from "../controllers/order.js";

const router = Router();

//params
router.param("userId", UserController.getUserById);
router.param("orderId", OrderController.getOrderById);

//Actual routes
//create
router.post(
  "/order/create/:userId",
  AuthController.isSignedIn,
  AuthController.isAuthenticated,
  UserController.pushOrderInPurchaseList,
  ProductController.updateStock,
  OrderController.createOrder
);
//read
router.get(
  "/order/all/:userId",
  AuthController.isSignedIn,
  AuthController.isAuthenticated,
  AuthController.isAdmin,
  OrderController.getAllOrders
);

//status of order
router.get(
  "/order/status/:userId",
  AuthController.isSignedIn,
  AuthController.isAuthenticated,
  AuthController.isAdmin,
  OrderController.getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  AuthController.isSignedIn,
  AuthController.isAuthenticated,
  AuthController.isAdmin,
  OrderController.updateStatus
);

export default router;