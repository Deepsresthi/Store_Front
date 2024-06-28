import User from "../models/user.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"; 
import expressJwt from "express-jwt";

class AuthController {

    //SIGN UP FUNCTION
    signup = async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg
            });
        }

        const user = new User(req.body);

        try {
            await user.save();
            return res.json({
                name: user.name,
                email: user.email,
                id: user._id
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({
                error: "NOT able to save user in DB"
            });
        }
    };

    //SIGN IN FUNCTION
    signin = (req, res) => {
        const errors = validationResult(req);

        const { email, password } = req.body;

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg
            });
        }

        User.findOne({ email }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    err: "User email doesn't exit"
                })
            }

            if (!user.authenticate(password)) {
                return res.status(401).json({
                    err: "Email and password do not match!"
                })
            }
            
            //secret token
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            //put token in cookie 
            res.cookie("token", token, { expire: new Date() + 9999 });

            //send response to front end
            const { _id, name, email, role } = user;
            return res.json({ token, user: { _id, name, email, role } });

        })
    };

    //SIGNOUT FUNCTION
    signout = (req, res) => {

        res.clearCookie("token");

        res.json({
            message: "User signout successfully"
        });
    }

    //middleware

    isSignedIn = expressJwt({
        secret: process.env.SECRET,
        algorithms: ["HS256"],
        userProperty: "Auth",
    })

    //custom middleware
    isAuthenticated = (req, res, next) => {
        let checker = req.profile && req.auth && req.profile._id.toString() === req.auth._id.toString();
        if (!checker) {
            return res.status(403).json({
                err: "User Access Denied"
            })
        }
        next();
    }

    isAdmin = (req, res, next) => {
        if (req.profile.role === 0) {
            return res.status(403).json({
                err: "You are not ADMIN, AccessDenied"
            })
        }
        next()
    }
}

export default new AuthController();
