const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();



//Api Routes Configs
router.post('/register', async (req,res)=> {


   // username Verfification
   const usernameExist = await User.findOne({username:req.body.username});
   if(usernameExist) return res.status(400).send('Username já existe')

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
   if(!user) return res.status(400).send('Username não existe')
   //check if password correct
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(400).send('Password Inválida');

   //Create jwt
   const token = jwt.sign({username: user.username}, process.env.TOKEN_PASS)
   res.header('auth-token',token).send(token);

   //res.redirect('/api/admin/home');
   
})
   
module.exports = router;


