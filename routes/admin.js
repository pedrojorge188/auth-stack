const express = require('express');
const router = express.Router();
const verifyAdmin = require('./privateRouteAdmin');



router.get('/home', verifyAdmin ,(req,res) => {
    res.send('Admin Page');
});

module.exports = router;