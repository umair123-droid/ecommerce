

const Orders=require("../models/checkout")
const Users=require('../models/userModel')

const checkOutCtrl={
    getOrders:async(req,res)=>{
        try {
            // const {email,adress,number,cart}=req.body;
            // const user = await Users.findById(req.user.id).select('name email')
            // if(!user) return res.status(400).json({msg: "User does not exist."})
            // const {_id, name, email} = user;
const{adress,number,cart}=req.body

            const  newOrder=new Orders({
                // user_id: _id, name,email,adress,number,cart\
                adress,number,cart
            })


            // cart.filter(item => {
            //     return sold(item._id, item.quantity, item.sold)
            // })

            
           
            await newOrder.save()
            console.log({newOrder})
    
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }




    }
}
module.exports=checkOutCtrl