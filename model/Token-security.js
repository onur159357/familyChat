const mongoose = require('mongoose'),
    TokenSecuritySchema = mongoose.Schema;

const tokenSecuritySchema = new TokenSecuritySchema({
    // 1 saat sonra silinecek // 3600 saniye
    expire: { 
        type: Date, 
        index: { 
            expireAfterSeconds: 3600
        } 
    },
    userName : {
        type : String,
    }, 
    token : {
        type : String,
    } 
});


module.exports = mongoose.model('tokenSecuritySchema', tokenSecuritySchema);
mongoose.model('tokenSecuritySchema').ensureIndexes(function(err) {
    //console.log('ensure index', err)
})