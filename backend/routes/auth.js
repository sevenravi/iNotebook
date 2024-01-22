const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
require('dotenv').config()

//ROUTE 1:creating a user using :POST "/api/auth/createuser" no login required
router.post('/createuser',
    [
        body('name', 'Enter a valid Name').isLength({ min: 3 }),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
        body('email', 'Enter a valid email').isEmail()
    ], async (req, res) => {

        //checking for any validations errors
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ msg: errors.array() });
        }
        // console.log(User)
        try {
            //checking for dublicate emails
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ msg: "email already exists" })
            }

            //incrypting password
            const salt = await bcrypt.genSalt(10)
            const secPassword = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            })
            //generating webTokens
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ msg:"User Created Succesfull",token })
        } catch (error) {
            console.error(error.message);
            res.status(400).send("some error has occured")
        }
    })

//ROUTE 2:authencating a user using :POST "/api/auth/login" no login required
router.post('/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ], async (req, res) => {

        // console.log(req.body); 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ msg: errors.array() });
        }

        const { email, password } = req.body
        try {

            let user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({ msg: "Incorrect email or password" })
            }

            const passwordcmpr = await bcrypt.compare(password, user.password)
            if (!passwordcmpr) return res.status(400).json({ msg: "Incorrect email or password" })

            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ token })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error has occured")
        }

    })

//ROUTE 3:fetching a user using :POST "/api/auth/getuser"  login required
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user =await User.findById(userid).select("-password");
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has occured")
    }
    })

module.exports = router