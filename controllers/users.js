const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


usersRouter.post('/', async(request,response)=>{
    const {username,name,password}= request.body;

    // convert the olaintext password to hashed password
    const saltRounds = 10;
    const passwordHash =await bcrypt.hash(password,saltRounds);


    // prepare the user onject to store in  the database

const user = new User({
    username,
    name,
    passwordHash
});


// store it in the database
const savedUser=await user.save();

response.status(201).json(savedUser);

});


usersRouter.get('/',async(rerquest,response)=>{
    const users=await User.find({},{}).populate('notes',{content:1,important:1})
    response.json(users)
})

module.exports = usersRouter;