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
  const { userName, name, surName, profilePhotoUrl, password } = req.body;
  if(password && password.length >= 8) {
    //bcrypt ile şifreleme
    bcrypt.hash(password, 10).then( (hash) => {
      const userSchema = new UserSchema({
        userName,
        name,
        surName,
        profilePhotoUrl,
        password :hash,

      });
      
      //user unique control and  
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
  } else if( password.length == 0) {
    res.render('register', {error : 'şifre girmek zorundasınız'});

  } else if (password.length < 8) {
    res.render('register', {error : 'şifreniz 8 karakterden az olamaz'})

  }
  

});

module.exports = router;