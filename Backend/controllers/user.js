import User from "../models/user.js";

class UserController{
    
    getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
        return res.status(400).json({
            error: "No user was found in DB"
        });
        }
        req.profile = user;
        next();
    });
    };

    getUser = (req, res) => {
        return res.json(req.profile);
    }

}

export default new UserController();