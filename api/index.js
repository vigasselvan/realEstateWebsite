import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const app = express();
mongoose.connect("mongodb+srv://admin-vigas:welcome123@cluster0.yieowhx.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, ()=>{
    console.log("Server is running on port 3000!");
});