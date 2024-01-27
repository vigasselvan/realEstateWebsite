import mongoose from "mongoose";

//schema is a blueprint of the document
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    },
},{timestamps: true});

//creating a User DB, inside the DB will have a collection called Users and inside the collection will have the documents based on userSchema
const User = mongoose.model("User", userSchema);

export default User;
