const mongoose = require('mongoose'),
    UserSchema = mongoose.Schema;

const userSchema = new UserSchema({
    userName : {
        type : String,
        required : [true, '{PATH} i girmek zorundasınız'],
        unique : true,
        minlength : [3, '{PATH} {MINLENGTH} DEN KUCUK OLAMAZ SIZ {VALUE} GIRDINIZ'],
        maxlength : [20, '{PATH} {MAXLENGTH} DEN UZUN OLAMAZ SIZ {VALUE} GIRDINIZ']
    },
    password : {
        type : String,
        require : [true, '{PATH} girmek zorundasınız'],
        minlength : [8, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden az']
    } 
});

module.exports = mongoose.model('User', userSchema);