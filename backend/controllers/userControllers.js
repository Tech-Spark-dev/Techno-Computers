const asyncHandler = require ('express-async-handler');

const User = require('../models/userModel');
const generateToken = require('../utils/generatetoken');


const registerUser = asyncHandler(async(req,res)=>{                //for creating users
        const {name,email,password,pic} = req.body;             //requesting from user
    
        const userExists = await User.findOne({email});
         if(userExists){
            res.status(400);
            throw new Error("user Already Exists");
        }

        const user = await User.create({
                name,
                email,
                password,
                pic 
        });

        if(user){
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                pic:user.pic,
                token:generateToken(user._id)
            })
        }
        else{
            res.status(400);
            throw new Error("Error Occurred");
        }

     
    });

    const authUser = asyncHandler(async(req,res)=>{           // for login
        const {email,password} = req.body;                     //requesting from user
    
        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password)) ){       //check for the user and password
            res.json({
                _id:user.id,
                name:user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                pic:user.pic,
                token:generateToken(user._id)

            })
        }   
        else{
            res.status(400);
            throw new Error("Invalid Email or Password");
        }

     
    });
    


module.exports = {registerUser,authUser};