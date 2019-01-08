const express = require('express'),
    router = express.Router();

router.get('/', (req, res, next) => {
    res.render('chat', { userName : req.decode.userName, token : req.query.token });
})

module.exports = router;