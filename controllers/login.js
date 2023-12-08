const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
const loginRouter = require('express').Router();
const User=require('../models/user');
const { request } = require('../app');
const config=require("../utils/config");

loginRouter.post('/',async (request,response)=>{

    // get the username and password from the user

   const { username,password } = request.body ;

//    search and find the documnent of the user with username

const user = await User.findOne({username});
     
const passwordCorrect = user===null?false
:await bcrypt.compare(password, user.passwordHash);

if(!(user&&passwordCorrect)){
    return response.status(401).json({
        error:'invalid username or password'
    });


}

const userForToken={
    username:user.username,
    id:user._id
}

// generate the token

const token = jwt.sign(userForToken, config.SECRET,{expiresIn:60*60});

// authentication sucessful
// return the token
response.status(200).send({token,username:user.username,name:user.name});
      

});

module.exports=loginRouter;