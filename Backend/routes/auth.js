import { Router } from "express";
import AuthController from "../controllers/auth.js";
import { check } from "express-validator";

const router = Router();

router.post("/signup",
    [
        check("name", "name should be at least 3 char").isLength({ min: 3 }),
        check("email", "email is required").isEmail(),
        check("password", "password should be at least 3 char").isLength({ min: 3 })
    ],
    AuthController.signup);

router.post("/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 3 })
    ],
    AuthController.signin);    

router.get("/signout", AuthController.signout);

router.get("/testroute", AuthController.isSignedIn, (res, req) => {
    res.send("Test Route");
});

export default router;

