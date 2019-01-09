const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');
//const jwt = require('jsonwebtoken');

//google butonuna basıldığı anda çalışacak kısım
router.get('/google', passportGoogle.authenticate (
        'google', 
        { 
            //google dan login olacak kişi hakkında istediğimiz bilgiler.
            scope: ['profile'] 
        }
    )
);

//google dan ilgili kullanıcı döndüğünde (callback olduğunda)
router.get('/google/callback', passportGoogle.authenticate(
        'google', 
        { 
            //login işlemi başarısız olursa gideceği url
            failureRedirect: '/login' 
        },
    ),
    //Login işlemi başarılı olursa gideceği url
    (req, res) => {
        res.redirect('/chat')
        //jwt ile yapılışı
            // const payload = {
            //     userName : req.user.name,
            //     profilePhotoUrl : req.user.profilePhotoUrl + '0',
            //   };
            //   //jwt kullanarak token oluşturuyoruz
            //   const token = jwt.sign(payload, req.app.get('api_secret_key'), { 
            //     expiresIn : 3600, //saniye türünden. 1 saat geçerli

            //   });
            //   res.redirect(`http://localhost:3000/chat?token=${token}`);
        
        
    }
)
module.exports = router;