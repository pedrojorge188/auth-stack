const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){

    const token = req.header('auth-token');

    if(!token) return res.status(401).send('Voçê não tem acesso a esta página');
    try{
        
        const verificar = jwt.verify(token, process.env.TOKEN_PASS);
        req.user = verificar;
        if(req.user['permissions'] == false){
            res.status(401).send('Apenas Administradores podem aceder a esta página');
            console.log("admin:"+req.user['permissions'])
        }else{
          console.log("admin:"+req.user['permissions'])
          next();
        }   

    }catch(err){
        console.log(err)
        res.status(400).send('Invalid Token');
    }
}
 