const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")
const Order = require('../models/Order.js');

//in some of the routes below we have used verifyTokenAnd... middleware which are imported from a file, which basically calls next fxn after getting jsonwebtoken from the headers and verifying it. if next fxn within them is called then the async fxn get it's turn to run

//create Order
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})

//update Order info
router.put("/:orderId", verifyTokenAndAdmin, async (req, res) => {

    try {
        //$set fxn will set the required object with all the fields given in the body
        //new: true means return the updated object after updating it
        const order = await Order.findByIdAndUpdate(req.params.orderId, {
            $set: req.body,
        },
            { new: true });

        res.status(201).json(order);
    } catch (error) {
        res.status(401).json(error)
    }
})

//delete order
router.delete("/:orderId", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.orderId);
        res.status(200).json("order deleted sucessfully!")
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get user orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userid: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(402).json(error);
    }
})

//get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get income
// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
//     console.log(previousMonth)
//     try {
//         //there is typo in previousMonth variable, some error may occurr in future
//         const income = await Order.aggregate([
//             { $match: { createdAt: { $gte: previousMonth } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                     sales: "$amount",
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: "$sales" },
//                 },
//             },
//         ]);

//         res.status(200).json(income);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router