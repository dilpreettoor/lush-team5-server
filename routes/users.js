const express = require('express');
const config = require("../knexfile.js");
const { error } = require("console");
const knex = require("knex")(config);
const bcrypt = require("bcrypt")
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const auth =require('../controllers/auth.js')

async function hashPassword(req,res){
    const password = req.body.password
    const saltRounds = 10

    await bcrypt
      .hash(password, saltRounds)
      .then(hash => {

            console.log('Hash ', hash)
            validateUser(hash, req.body, res)
      })
      .catch((err) => {
        console.error(err.message) 
        return false})


}


function validateUser(hash, data, res) {
    const {email_address, password, phone_number, birthdate, first_name, last_name, address_1, address_2, postalcode, city, state, country} = data
    console.log('enering validate ', 'password:',password,' hash:',hash)
    console.log(data)

    bcrypt
      .compare(password, hash)
      .then(response => {
        console.log(response) // return true
        knex("users")
        .insert({
            user_id:uuidv4(),
            email_address:email_address,
            password:hash,
            phone_number:phone_number,
            birthdate:birthdate,
            first_name:first_name,
            last_name:last_name,
            address_1:address_1,
            address_2:address_2,
            postalcode:postalcode,
            city:city,
            state:state,
            country:country,
            created_on:new Date(),
            updated_on:new Date()
        })
        .then((response)=>{
            console.log(response)
            res.json({
                success: true
                })
            
        }
        )
      })
      .catch((err) => {
        console.error('error msg:',err.message) 
        res.send('error msg:',err.message)
    }) 
}

// POST signup
router.route('/signup')
    .get((req,res)=>{
        res.send('POST to signup')
    })
    .post((req,res)=>{
        hashPassword(req,res)


    })


// POST login
router.route('/login')
    .post((req,res)=>{
        console.log(req)

        knex
        .from("users")
        .where("email_address","=",req.body.headers.email_address)
        .first()
        .then((data)=>{
            console.log(data.password)
            
             bcrypt
            .compare(req.body.headers.password, data.password) 
            .then((response)=>{
                console.log('data',data)
                if(response) { 
                    let token = jwt.sign({username:req.body.headers.email_address},'my_secretkey')    
                    res.status(200).json({
                    token: token,
                    user_id: data.user_id,
                    first_name: data.first_name,
                    last_name: data.last_name
                    })
            
                }
                else {
                    res.json({
                        token: null
                        })
                }
            }) 

        }
        )
        .catch((err)=>{
        console.log(err)
        const error_msg = 'error'

        res.status(404).json({
            error: {
                message: error_msg
            }
            })
        }
        )

    })




router.route('/order-history')
    .get((req,res)=>{
        // Request Header: { headers: { Authorization: Bearer ${YOUR_TOKEN_HERE}; } }
        auth.verifyJWT(req,res)
        // res.json({
        //     iat: Date.now()  // Time when token was created
        //   })
    })
router.route('/profile')
    .get((req,res)=>{
        knex
        .from('users')
        .where("email_address","=",req.body.email_address)
        .then((data)=>{
            res.status(200).send(data.user_id)
        }
        )
        .catch((err)=>{console.log(err)})

        // Request Header: { headers: { Authorization: Bearer ${YOUR_TOKEN_HERE}; } }
        auth.verifyJWT(req,res)
        // res.json({
        //     iat: Date.now()  // Time when token was created
        //   })
    })


module.exports = router;