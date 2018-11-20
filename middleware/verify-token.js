const jwt = require('jsonwebtoken');

//model
const TokenSecuritySchema = require('../model/Token-security');

module.exports = (req, res, next) => {
    //token aşağıdaki 3 şekilde gelebilir 
    //query = localhost:3000/api/movies?token=dqwdq  // urldeki token query ile yakalana bilir
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    
    //iptal edişmiş token kontrolü
    function canceledToken() {
        return new Promise((resolve, reject) => {
            TokenSecuritySchema.findOne({ 'token' : token }, (error, data) => {
                if(error)
                    console.log(error)
        
                 if(data !== null) {
                     resolve(false);

                 } else {
                     resolve(true);

                 }
        
            });
        })
    }

    canceledToken().then((data) => {
        if(token){
            //iptal edilmiş token varmı diye kontrol ediyoruz
            if(data) {
                //token ı verify (doğruluyoruz) ediyoruz
                jwt.verify(token, req.app.get('api_secret_key'), (error, decoded) => {
        
                    if(error) {
                        res.json({
                            status:false,
                            message:'authenticate (kimlik doğrulaması hatası)'
        
                        })
        
                    }else{
                        //payload kısmını burada alıyoruz
                        req.decode = decoded;
                        next(); //Herşey yolunda herhangibir routerile eşleşebilir
                        
                    }
        
                })
            } else {
                res.render('error', {
                    status:false,
                    message:'iptal edilmiş token kullanıyorsunuz'

                })
            }
    
        } else {
            res.json({
                status:false,
                message: 'Herhangibir token oluşturmadınız'
    
            })
    
        }

    }).catch((err) => {
        console.log(err);

    })

    

};