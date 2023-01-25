const jwt = require("jsonwebtoken");
const router = require("express").Router();


//this is the main fxn, which checks for jwt token in the headers and verify it
const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        //if token is not faulty then payload is generated else the err is thrown
        jwt.verify(token,process.env.JWT_SECRET,process.env.JWT_EXPIRE,(err,payload)=>{
            if(err){
                res.status(401).json("Token is invalid");
            }else{
                //this payload comes when we actually signed the token during login process
                req.user = payload;
                next();
            }
        });
    }else{
        res.status(401).json("You are not authenticated");
    }
}

//since they are the middleware, so they have acces to req,res objectsa automatically and calling next will run the third fxn in the parameters of their parents
const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        //if user is adming then he has the right to everything
        if(req.user.id === req.params.userId || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to that");
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(401).json("You are not allowed to do that")
        }
    })
}
module.exports = {verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyToken}