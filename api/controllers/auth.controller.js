import User from "../models/users.model.js"; 
import bcryptjs from 'bcryptjs';

export const signUp = async(req, res) => {
    const {username, email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);   //encrypt password  
    const newUser = new User({username, email, password : hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message: "User created"}); //201 mean POST request is successfully added a data
    }catch(err){
        res.status(500).json({message: err.message});    //if the user is already saved will prompt error
    }
};