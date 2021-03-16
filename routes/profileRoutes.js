// Import modules
const express       = require('express');
const router        = express.Router();
const CONFIG        = require('../config');
const User          = require('../models/User');

router.post(CONFIG.apis.profileApis.register, async (req, res) =>
{
    try
    {
        const user = await User.find({ email : req.body.email});
        if(user.length > 0)
        {
            res.status(400).json({ message : "email already registered"})
        }
        else
        {
            let newUser = new User(
                {
                    name    : req.body.name,
                    email   : req.body.email,
                    address : req.body.address,
                    phone   : req.body.phone,
                    password: req.body.password
                }
            )
    
            newUser = await newUser.save();
            res.status(201).json({ message : "User has been created"})
        }
    }
    catch(err)
    {
        res.status(400).json({ message : err.message})
    }
    
})

router.post(CONFIG.apis.profileApis.details, async (req, res) =>
{
    try
    {
        res.json(await User.find({ _id : req.body.id}))
    }
    catch(err)
    {
        res.status(500).json({ message : err.message})
    }
})

router.post(CONFIG.apis.profileApis.signin, async (req, res) =>
{
    try
    {
        const user = await User.find({ email : req.body.email});
        if(user.length < 1)
        {
            res.status(401).json({message : "email is not registered"})
        }
        else
        {
            if(req.body.password === user[0].password)
            res.status(201).json({ 
                username : user[0].email,
                id : user[0]._id,
                isLoggedIn : true,
                isAdmin : user[0].email == "admin@admin.admin"
            })
            else
                res.status(401).json({message : "Password does not mach"})
        }
    }
    catch(err)
    {
        res.status(500).json({ message : err.message})
    }
})


module.exports = router