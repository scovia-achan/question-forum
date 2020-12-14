const router = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation.js')


router.post('/register', async (req,res)=> {
    //validating data for a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user in database
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).json({msg:"email already exists"})
    
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // creat a user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    });
    try{
        const savedUser = await user.save();
        res.send({user: savedUser._id, name: savedUser.name});
        

    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({msg:"Email or password is wrong"});
       
    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
        return res.status(400).json({msg: "Password is wrong"});
            
    } 

    // res.send('Successfully logged in')

    //Assigning tokens
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);
});


module.exports = router;
