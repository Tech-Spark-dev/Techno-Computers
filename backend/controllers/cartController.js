const asyncHandler = require ('express-async-handler');
const AddressModel = require('../models/cartModel');
const generateToken = require('../utils/generatetoken');


const Address = asyncHandler(async(req,res)=>{
    const {userid,street,place,city,district,state,landmark,phonenumber,name} = req.body;

    const userAddress = await AddressModel.create({
            userid,
            name,
            street,
            place,
            city,
            phonenumber,
            district,
            state,
            landmark
    });

    if(userAddress){

        res.status(201).json({
                _id:userAddress.id,
                userid:userAddress.userid,
                name:userAddress.name,
                street:userAddress.street,
                city:userAddress.city,
                district:userAddress.district,
                phonenumber:userAddress.phonenumber,
                state:userAddress.state,
                landmark:userAddress.landmark,
                token:generateToken(userAddress._id)
        })
    }
    else{
        res.status(400);
        throw new Error("Error Occurred");
    }
})

module.exports={Address};