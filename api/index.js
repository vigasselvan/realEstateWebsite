import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const app = express();
mongoose.connect("mongodb+srv://admin-vigas:welcome123@cluster0.yieowhx.mongodb.net/User?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
});

app.listen(port, ()=>{
    console.log("Server is running on port 3000!");
});

app.get('/test', (req, res)=>{
    res.send("Hello World!");
});