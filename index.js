const express=require('express');
const dotenv=require('dotenv');
const authRoutes=require('./routes/Auth');
const postRoutes=require('./routes/Posts');
const mongoose=require('mongoose');
const authMiddleware=require('./middleware/Auth');

// takeing the Port from the config file
dotenv.config();
const PORT=process.env.PORT;

const app=express();

// using the express.json middleware from express library.
app.use(express.json());

// connecting to the MongoDB database
mongoose.connect("mongodb://localhost:27017/authapp")
.then(()=>{ console.log("Connected to MongoDB")})
.catch((err)=>{ console.log("Error connecting to MongoDB")});

app.use('/api/v1/',authRoutes);
app.use('/api/v1/',authMiddleware,postRoutes);    
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});