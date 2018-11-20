const express = require('express'),
    router = express.Router();
//Model
const TokenSecuritySchema = require('../../model/Token-security');

router.post('/logout', (req, res, next) => {
    const tokenSecuritySchema = new TokenSecuritySchema({
        expire : Date.now(),
        userName : req.decode.userName,
        token : req.query.token,
    });

    const promise = tokenSecuritySchema.save();

    promise.then((data) => {
        res.redirect('login');

    }).catch((err) => {
        res.json(err);

    })



    
})

module.exports = router;