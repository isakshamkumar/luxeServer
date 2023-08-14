const express = require('express')
let bodyParser= require('body-parser')
const app = express()
const mongoose = require('mongoose');
const port = 3005
// app.use(middleware1)
const fs = require('fs');
const path = require('path');
const cors = require('cors');//this tells server that request can come from anywhere, this should only be used innproduction starting apps
app.use(bodyParser.json()) // bodyparser.json returns a middleware which also as in our fuctin case does something(extactig body data here) and calls a next()
app.use(cors());

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
  });
  const UserDetails = mongoose.model('Users', userSchema);
  mongoose.connect('mongodb+srv://ksaksham39:rZt5XLthOJiyzJ2j@cluster0.riwhykm.mongodb.net/Luxe-users', { useNewUrlParser: true, useUnifiedTopology: true,dbName:'Luxe-users' });

app.post('/signup',async(req,res)=>{
   const userDetails=req.body;
   let existingUser = await UserDetails.findOne({ email: userDetails.email });

   if(existingUser){
    res.status(404).json({message:'Email Already Exists'});
   }
   else{
    // const newUser={fullName:userDetails.fullName,email:userDetails.email};
    const newUser= new UserDetails({fullName:userDetails.fullName,email:userDetails.email})
    newUser.save()
    res.status(201).json({message:'Successfully Registered'})
   }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
