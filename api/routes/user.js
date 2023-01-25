const router = require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const bcrypt = require("bcryptjs");
const User = require('../models/User');

//in all the routes below we have used verifyTokenAnd... middleware which are imported from a file, which basically calls next fxn after getting jsonwebtoken from the headers and verifying it. if next fxn within them is called then the async fxn get it's turn to run

//update user info
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {

    //if body body have password then hash it before updating into the database
    if (req.body.password) {
        //generating random bytes 
        const salt = await bcrypt.genSalt(10)
        //referencing the password from the above schema and hashing it using bcrypt library
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    try {
        //$set fxn will set the required object with all the fields given in the body
        //new: true means return the updated object after updating it
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body,
        },
            { new: true });

        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(401).json(error)
    }
})

//delete user
router.delete("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User deleted sucessfully!")
    } catch (error) {
        res.status(500).json(error);
    }
})

//find a single user, only admin can do that
router.get("/find/:userId", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error);
    }
})

//finding all users, only admin can do that
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    //if you have specified some query in the url then get it
    const query = req.query.new;
    try {
        //if there is query then sort in descending order of id and limit to 5 objects
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
})

//getting stats about users
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        //$match works as a data set to only lookup, below it means look for greater then lastyear dates
        //$project used to add fields in output object, below we are adding month field and by $month: we are getting value of month in 1 to 12 no. from createdAt date
        // month is a field and $month is some mongodb aggregator fxn
        //$group: the fields specified in this fxn will only make their way through the pipeline and grouping will be done onto them
        //$sum: her this fxn within $group fxn means that sum all the month values
        //just see the output in the postman for this endpoint and your data in mongodb and you will better understand the role of each aggregator fxn
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },

                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(err);
    }
})
module.exports = router