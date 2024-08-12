const User = require('../models/user');
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
async createUser(req,res) {
    const errors =  validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {name,password,role,email} = req.body;
        let isUserExist = await User.findOne({email})
        if (isUserExist) {
            return res
              .status(400)
              .json({ errors: [{ message: 'User already exists' }] });
          }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            name : name,
            password : encryptedPassword,
            role : role,
            email : email
        })
        await newUser.save();
        const payload = {
            user : {
               id: newUser?.id,
               role : newUser?.role
            }
        }
        jwt.sign(
            payload,
            'shivam',
            {expiresIn:3600},
            (err,token) => {
                if(err) throw err;
                res.status(200).json({
                    message : "User Registered Successfully",
                    token : token
                })
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
},
async loginUser(req,res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {email , password} = req.body
        const user = await User.findOne({email});
        if(!user) {
            res.status(400).json({ errors: [{ message: 'Invalid Credentials' }] });
        }
        const isPasswordMatched = await bcrypt.compare(password,user.password)
        if (!isPasswordMatched) {
            return res
              .status(400)
              .json({ errors: [{ message: 'Invalid credentials' }] });
        }

        const payload = {
            user : {
                id : user?.id,
                role : user?.role
            }
        }
        jwt.sign(
            payload,
            'shivam',
            {expiresIn :  3600},
            (err,token) => {
                if (err) throw err;
                res.status(200).json({
                    errors : [
                        {
                            message : "Logged in successfully ",
                            token : token
                        }
                    ]
                })
            }
        )

    } catch(err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}
}
