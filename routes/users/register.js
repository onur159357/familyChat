const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//model users
const UserSchema = require('../../model/User');
//controler
const userUniqueControler = require('../controler/userUnique');

//GET
router.get('/register', (req, res, next) => {
    res.render('register');
})

//POST
router.post('/register', function(req, res, next) {
  //Schema save
  const { userName, password } = req.body;
  //bcrypt ile şifreleme
  bcrypt.hash(password, 10).then( (hash) => {
    const userSchema = new UserSchema({
      userName,
      password :hash

    });
    
    //user unique control and savedb
    userUniqueControler(req.body.userName)
      .then((data) => {
          if(data === null) {            
            //save db
            const promise = userSchema.save();
            promise.then((data) => {
              res.render('register', data);
          
            }).catch((err) => {
              res.render('register', {error : err});
          
            });

          } else {
            //user unique error
            res.render('register', {error : 'Bu kullanıcı adı ile daha önce kayıt yapılmış'});

          }

    }).catch((err) => {
      res.json(err);

    });
  
  });

});

module.exports = router;