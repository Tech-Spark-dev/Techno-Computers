const express = require ('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require('cors');

const app = express();
dotenv.config({ path: './.env' });
connectDB();          //DB connection

app.use(express.json()); // for getting json data from user

const corsOptions ={
    origin:['http://localhost:3000',"https://techno-stage1.onrender.com/" ],
    // credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send("API is running");
})                                   //api created

app.use('api/users',userRoutes);                       //middleware config.

app.use(notFound,errorHandler);

const PORT = process.env.PORT || 5000 ;

app.listen(PORT,console.log(`server started on port ${PORT}`)); //webserver created
