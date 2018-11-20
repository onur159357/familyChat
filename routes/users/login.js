const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//model users
const UserSchema = require('../../model/User');
//GET
router.get('/login', (req, res, next) => {
  res.render('login');
})
//POST
router.post('/login', (req, res, next) => {
  const {userName, password} = req.body;
  
  UserSchema.findOne({userName}, (error, user) => {
    if(error)
      throw error;

    if(!user) {
      res.render('login',{
        status : false,
        errorMessage : 'Kullanıcı adına kayıtlı kullanıcı yok',

      })

    }else{
      //bcrypt ile şifreyi çözüp karşılaştırıyoruz
      //password = kullanıcının girdiği şifre
      //user.password = db de kayıtlı olan şifre
      //iki password uyuşuyorsa result true uyuşmuyorsa false döner
      bcrypt.compare(password, user.password).then( (result) => {
          if(!result) {
            res.render('login',{
              status : false,
              errorMessage : 'Girilen şifre yanlış'
            
            })
          
          } else {
            const payload = {
              userName

            };
            //jwt kullanarak token oluşturuyoruz
            const token = jwt.sign(payload, req.app.get('api_secret_key'), { 
              expiresIn : 3600, //saniye türünden. 1 saat geçerli

            });
            res.redirect(`http://localhost:3000/chat?token=${token}`);
            // res.json({
            //   status : true,
            //   token,

            // })
          }

      });

    }

  })

})

module.exports = router;
