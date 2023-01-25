const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")
const Cart = require('../models/Cart.js');

//in some of the routes below we have used verifyTokenAnd... middleware which are imported from a file, which basically calls next fxn after getting jsonwebtoken from the headers and verifying it. if next fxn within them is called then the async fxn get it's turn to run

//create Cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

//update Cart info
router.put("/:cartId", verifyTokenAndAuthorization, async (req, res) => {

    try {
        //$set fxn will set the required object with all the fields given in the body
        //new: true means return the updated object after updating it
        const cart = await Cart.findByIdAndUpdate(req.params.cartId, {
            $set: req.body,
        },
            { new: true });

        res.status(201).json(cart);
    } catch (error) {
        res.status(401).json(error)
    }
})

//delete cart
router.delete("/:cartId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.cartId);
        res.status(200).json("cart deleted sucessfully!")
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.find({ userid: req.params.userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(402).json(error);
    }
})

//get all carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router