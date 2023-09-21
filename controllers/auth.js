const express = require('express');
const config = require("../knexfile.js");
const { error } = require("console");
const knex = require("knex")(config);
const bcrypt = require("bcrypt")
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')





exports.verifyJWT = (req,res) => {
    console.log("entering verifyJWT ")
    const token = req.body.Authorization.replace('Bearer ',"")
    jwt.verify(token, 'my_secretkey',(err,decoded)=>{
        console.log('decoded: ',decoded)
        if(err) {
            res.status(403).json({
                success: false,
                msg: 'None'
            })
        } else {
            res.send(`Protected Info`)

        }
    })

};

