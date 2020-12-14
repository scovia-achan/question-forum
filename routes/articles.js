const router = require('express').Router();
const verify = require('./tokenVerify')

router.get('/', verify, (req,res)=>{
    res.json({articles: {title: 'books', article: 'books that have been read'}})
});

module.exports =router;