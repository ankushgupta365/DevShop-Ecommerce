const router = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_KEY)

router.post("/payment", async(req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "INR"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})

// router.post("/payment", async(req,res)=>{
//     try {
//         await stripe.paymentIntents.create({
//             amount: req.body.amount,
//             source: req.body.tokenId,
//             currency: 'inr',
//             payment_method_types: ['card']
//         },(stripeErr,stripeRes)=>{
//             if(stripeErr){
//                 res.status(500).json(stripeErr)
//             }else{
//                 res.status(200).json(stripeRes)
//             }
//         })
//     } catch (error) {
//         res.status(500).json("stripe method error: manual")
//     }
// })

// const paymentIntent = await stripe.paymentIntents.create({
//     amount: 2000,
//     currency: 'usd',
//     payment_method_types: ['card'],
//   });

module.exports = router