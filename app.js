const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');

const passport = require('passport');
const session = require('express-session');
const redisStore = require('./helper/redisStore');
const dotenv = require('dotenv');

//ortam değişkeni hazırlıyoruz google ve db bağlantılarımızı burada tutacağız
dotenv.config(); // .env içerisindeki bilgilere erişmek için process kullanıyoruz console.log(process.env.deneme);

//ROUTES
const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');
const { login, register, logout } = require('./routes/users/users');
const googleLogin = require('./routes/auth');

const app = express();

// db connection
const db = require('./helper/db')();

//Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key); //jwt için api_secret_key oluşturduk.

//Middleware(arakatman)
const isAuthenticated = require('./middleware/isAuthenticated');
const verifyToken = require('./middleware/verify-token');
//app.use('/api', verifyToken); //apinin altındaki bütün url ler verifyToken dan geçmeden çalışmayacak
//api ile yollar token yollamanın 3 farklı yolu var (143 ders 6. dk dan başlıyor)
// 1-) header ile yollama postmandan header bölümünden
      //key : x-access-token 
      //value : oluşturulan token

// 2-) post yaparken post datası olarak 
      // key : token
      // value : oluşturulan token

// 3-) url ile gönderme 
      // localhost:3000/api/movies?token=dqwdq uldeki token ı yakalama,

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine( "hbs", hbs(
  { 
    extname : "hbs", 
    defaultLayout : "layout", 
    layoutsDir: __dirname + "/views/layouts/"  
  }
));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//express-session
app.use(session({
  store : redisStore,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  // https li bağlantılarda secure: true kullanılabilir
  cookie: {maxAge : 360000 }
}))

//passportjs
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
//app.use('/chat', verifyToken);
app.use('/chat', isAuthenticated);
app.use('/user/logout', verifyToken);
app.use('/chat', chatRouter);
app.use('/user', login, register, logout);
app.use('/auth', googleLogin);


// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
