const express = require('express'),
    router = express.Router();

router.get('/', (req, res, next) => {
    res.render('chat', { userName : req.decode.userName, token : req.query.token, profilePhotoUrl : req.decode.profilePhotoUrl, });
})

module.exports = router;