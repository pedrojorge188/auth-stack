const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){

    const token = req.header('auth-token');

    if(!token) return res.status(401).send('Voçê terá que realizar Login');
    try{
        
        const verificar = jwt.verify(token, process.env.TOKEN_PASS);
        req.user = verificar;
        res.status(200);
        console.log("username:"+req.user['username'])
        next();
    

    }catch(err){
        console.log(err)
        res.status(400).send('Invalid Token');
    }
}