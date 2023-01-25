const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cors = require('cors')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const cartRoute = require('./routes/cart')
const stripeRoute = require('./routes/stripe')
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
        .then(()=>{console.log("DB connection Successfull")})
        .catch((err)=>{console.log(err)});

app.use(express.json());
app.use(cors())

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts",cartRoute)
app.use("/api/checkout",stripeRoute)

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running..");
})