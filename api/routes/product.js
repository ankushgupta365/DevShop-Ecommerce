const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Product = require('../models/Product.js');

//in some of the routes below we have used verifyTokenAnd... middleware which are imported from a file, which basically calls next fxn after getting jsonwebtoken from the headers and verifying it. if next fxn within them is called then the async fxn get it's turn to run

//create product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

//update Product info
router.put("/:productId", verifyTokenAndAdmin, async (req, res) => {

    try {
        //$set fxn will set the required object with all the fields given in the body
        //new: true means return the updated object after updating it
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, {
            $set: req.body,
        },
            { new: true });

        res.status(201).json(updatedProduct);
    } catch (error) {
        res.status(401).json(error)
    }
})

//delete user
router.delete("/:productId", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json("Product deleted sucessfully!")
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get a single Product, anyone can do that no authrization required
router.get("/find/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json(error);
    }
})

//get all products
router.get("/", async (req, res) => {
    //if you have specified some query in the url then get it
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            //if there is query then sort in descending order of date and limit to 5 objects
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            //query have any category specified then get those products only
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
        } else {
            products = await Product.find();
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router