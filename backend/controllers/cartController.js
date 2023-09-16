const asyncHandler = require ('express-async-handler');
const AddressModel = require('../models/cartModel');
const generateToken = require('../utils/generatetoken');


const Address = asyncHandler(async(req,res)=>{
    const {userid,street,place,city,district,state,landmark,phonenumber,name,details,total} = req.body;

    const userAddress = await AddressModel.create({
            userid,
            name,
            street,
            place,
            city,
            phonenumber,
            district,
            state,
            landmark,
            details,
            total
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
                details:userAddress.details,
                total:userAddress.total,
                token:generateToken(userAddress._id)
        })
    }
    else{
        res.status(400);
        throw new Error("Error Occurred");
    }
})

const userAddress = asyncHandler(async(req,res)=>{

    const usersAddress =await AddressModel.find({});
    res.json(usersAddress);
})

const updatePayment = asyncHandler(async(req,res)=>{                            // updating the payment status

    const {id}= req.params;
    const {razorpay_payment_id } = req.body;

    const paymentDetail = await AddressModel.findByIdAndUpdate(id,
        {ispaid:razorpay_payment_id},
        {new:true}
        );
    res.json(paymentDetail);     
})

const userscart = asyncHandler(async(req,res)=>{

    const {userid}= req.params;
    const usercart = await AddressModel.find({userid});
    if (!usercart) {
        // Handle the case where the user cart is not found (return an error response, for example)
        return res.status(404).json({ message: 'User cart not found' });
      }
    res.json(usercart);
})

module.exports={Address,userAddress,updatePayment,userscart};