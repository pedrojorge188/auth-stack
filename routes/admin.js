const express = require('express');
const router = express.Router();
const verify = require('./privateRoutes');



router.get('/home', verify ,(req,res) => {
    res.send('Admin Page');
});

module.exports = router;