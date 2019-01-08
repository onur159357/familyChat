const mongoose = require('mongoose'),
    UserSchema = mongoose.Schema;
//Unique kontrolü yapmamıza yardımcı oluyor
const findOrCreate = require('mongoose-find-or-create');

const userSchema = new UserSchema({
    userName : {
        type : String,
        required : [true, '{PATH} i girmek zorundasınız'],
        unique : true,
        minlength : [3, '{PATH} {MINLENGTH} DEN KUCUK OLAMAZ SIZ {VALUE} GIRDINIZ']
    },
    name : String,
    surname : String,
    profilePhotoUrl : String,
    password : {
        type : String,
        minlength : [8, 'Şifre alanı {VALUE}, {MINLENGTH} karakterden az']

    } 
});

//Unique kontrolü yapmamıza yardımcı oluyor
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);