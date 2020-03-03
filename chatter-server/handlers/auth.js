const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req,res,next){
    //finding a user
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id,username,profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl 
            },
            process.env.SECRET_KEY
        );
        //checking if their password matches what was sent to server
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } else {
        return  next({
            status:400,
            message: 'Invalid email/password'
        });
    }
    }
    catch(e){
        return next({status:400, message:'Invalid email/password'})
    }
}

exports.signup = async function(req,res,next){
    try{
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        },process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
        //create a user
        //create a token(singing a token)
        //process.env.SECRET_KEY
    } catch(err){
        //see what kind of error
        //if it is a certain error
        //respond with username/email already token
        //otherwise just send back a generic 400
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status : 400,
            message: err.message
        });
    }
};