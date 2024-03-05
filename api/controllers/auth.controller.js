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

export const google = async(req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});                   
        if(user){                                                                                   
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);                         //if user already exists, then generate a token for that user.
            const {password: pass, ...rest} = user._doc;
            res
                .cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);                            //if user doesn't exists, we have to generate random character password for that user.
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8) , email: req.body.email, password: hashPassword, avatar: req.body.photo});                  //create a username with the name of user and random characters.
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            res
                .cookie('access_token', token, {httpOnly: true})
                .status(200)
                .json(rest);    
        }
    }catch(err){
        next(err);
    }
}

export const signout = async(req, res, next) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json('User has been signed out!');
    }catch (error) {
        next(error);
    }
}