import User from "../models/users.model.js"; 
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js';

export const signup = async(req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);   //encrypt password  
    const newUser = new User({username, email, password : hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message: "User created"}); //201 mean POST request is successfully added a data
    }catch(err){
        next(err);
    }
};

export const signin = async(req, res, next) => {
    const {email, password} = req.body;  
    
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(400, "Invalid username/ user not found!"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, "Invalid password/ wrong credentials!"));
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;        //it collects the data of user and destructers the password as pass and remaining data as 'rest' using ...(spread operator).
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest);
    }catch(err){
        next(err);
    }
}
