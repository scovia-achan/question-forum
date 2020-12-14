const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied')
    try{
        const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifiedUser;
        next();
    } catch(err){
        console.log(err)
        res.status(400).send('Invalid token')
    }
    
}