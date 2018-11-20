const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/familyChatDb', { useNewUrlParser: true } );  //connect olacağımız db seçtik
    mongoose.set('useCreateIndex', true);

    //bağlanabildik mi diye test ediyoruz.
    mongoose.connection.on('open', () => {
        console.log("mongodb : connected");
    });

    mongoose.connection.on("error", (error) => {
        console.log("error", error);
    });

    mongoose.Promise = global.Promise;
}