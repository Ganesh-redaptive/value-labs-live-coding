import { JWT_SECRET } from './const';
const express = require('express');
const JWT = require('jsonwebtoken');

const app = express();
const PORT = '5437';

// field validations, auth using JWT

//authentication

const validateAuthToken = (req, res, cb) =>{
    //fetch token from headers
    const token = req.header('Authorization');
    // validate if token is not present in header
    if(!token) res.status(401).json({message: 'No token is provided!!!'});
    // validate it with the token available
    try{
        const validated = JWT.verify(token, JWT_SECRET);
        req.user = validated;
        // send success if passed
        cb();
    }
    //send error msg if not matched
    catch (error){
        res.status(400).json({message: 'Invalid Token Provided!!!'})
    }
}

//validate inputs
const validateParams= (req, res, cb) => {
    const {inp1, inp2} = req.query;
    //if values are not provided validation
    if(!inp1 || !inp2) res.status(401).json({message: 'two numbers are required to perform the operation!'});
    if(isNaN(inp1) || isNaN(inp2)) res.status(400).json({message: 'only numbers are accepted as input values.'});
    cb();
}

app.get('/login', (req, res)=>{
    const user ={id:1, email:'user@mail.com'}//dummy user 
    const token = JWT.sign(user, JWT_SECRET,{expiresIn:'4783230234'});
    res.send({token});

});

app.get('/addition',validateAuthToken, validateParams, (req, res)=>{
    let {num1, num2} = req.query;
     num1 = parseFloat(num1);
     num2 = parseFloat(num2);
    const result = num1+num2;
    res.status(200).json({result});
});

app.listen(PORT,()=>{
    console.log(`app is up on port:${PORT} `)
})