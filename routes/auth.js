const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

//Api Routes Configs
router.post('/register', async (req,res)=> {

   // username Verfification
   const usernameExist = await User.findOne({username:req.body.username});
   if(usernameExist) return res.status(400).send('Username existente')

   //Hash Passwords
   var salt = bcrypt.genSaltSync(10)
   const hashedPassword = await bcrypt.hashSync(req.body.password,salt);

   const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
   })
   try{
      const savedUser = await user.save();
      res.send(savedUser);
   }catch(err){
      res.status(400).send(err);
   }

});

router.post('/login', async (req,res)=>{

   //check if username exist
   const user = await User.findOne({username:req.body.username});
   if(!user) return res.status(400).send('Campo username Invalido')
   
   //check if password correct

   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(400).send('Campo password Invalido');

   //Create jwt

   const token = jwt.sign({username: user.username, permissions: user.permissions}, process.env.TOKEN_PASS, {})
   res.header('auth-token',token).json({auth:true, token});

   
})

router.post('/logout', function(req,res){
   res.end();
})
   
module.exports = router;


