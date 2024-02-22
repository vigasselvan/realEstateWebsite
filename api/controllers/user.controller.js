import bcryptjs from "bcryptjs";
import User from "../models/users.model.js";

export const test = (req, res) => {
    res.json({
        message: "Hello from test controller!"
    });
};  

export const userUpdate = (req, res) => {
    if(req.user.id !== req.params.id)   
        return next(errorHandler(401, "You can only update your account")); 
    
        try{
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }

            const userUpdate = async (req, res) => {
                try {
                    const updateUser = await User.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: {
                                username: req.body.username,
                                email: req.body.email,
                                password: req.body.password,
                                avatar: req.body.avatar,
                            }
                        },
                        { new: true }
                    );
                    const { password, ...others } = updateUser._doc;
                    res.status(200).json(others);
                } catch (error) {
                    next(error);
                }
            };
        } catch(error){
            next(error);
        }
};