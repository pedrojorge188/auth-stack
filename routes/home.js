const express = require('express');
const router = express.Router();
const verifyLogin = require('./loginRequired');



router.get('/', verifyLogin ,(req,res) => {
    res.send("Seja bem vindo utilizador  : "+req.user['username']);
    
});

module.exports = router;