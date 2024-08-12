const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {createUser, loginUser} = require('../controller/User')

const validationForUser = [
    check('name','Name is required').
    not().
    isEmpty(),
    check('email','Valid Email Required').isEmail(),
    check('password','Please  Enter Valid Password').isLength({
        min:8
    })
]

const validationForLogin = [
    check('email', 'Please enter valid email address').isEmail(),
    check('password','Password is required').exists()
]

router.post("/register",validationForUser,createUser)
router.post("/login",validationForLogin,loginUser)


module.exports =  router