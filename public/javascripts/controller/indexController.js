//chatControler.js içerisindeki option parametresi
const connectionOption = {
    reconnectionAttempts : 3, // 3 defa bağlanmayı densin
    reconnectionDelay : 600 // 600 milisaniyede bir bağlanmayı densin

}

//soket bağlantısını sağlayan function
let indexFactory = (userName) => {
    //connectionControler içerisindeki function
    connectSocket('http://localhost:3000/', connectionOption)
        .then((socket) => {
            console.log(socket);
        }).catch((err) => {
            console.log(err);
            return err;                 
        })
}

indexFactory();