import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';    
import { fileURLToPath } from 'url';
import path from 'path';  // Import the 'path' module
import userRouter from './routes/user.route.js';   //used userRouter instead of router since lot router name are used in this module      
import authRouter from './routes/auth.route.js';  

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
const envFilePath = path.resolve(__dirname, '../config.env');  // Adjust the path based on your project structure

// Load the environment variables from the specified .env file
dotenv.config({ path: envFilePath });

const port = process.env.PORT;
const app = express();
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    console.log('Connected to database ');
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
});

app.listen(port, ()=>{
    console.log("Server is running on port " + port + "!");
});

app.use(express.json()); 


app.use('/api/user', userRouter);   //to access middleware in userRouter.js
app.use('/api/auth', authRouter);   
