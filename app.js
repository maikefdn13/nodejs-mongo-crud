const express = require('express');
const mustache = require('mustache-express'); // TEMPLATE ENGINE MUSTACHE
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const router = require('./routes/index'); // Router
const helpers = require('./helpers'); // HELPERS.JS
const errorHandler = require('./handlers/errorHandler'); 


// Settings
const app = express();

// JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(flash());

app.use((req, res, next)=>{
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
});

app.use('/',router);

app.use(errorHandler.notFound);

// TEMPLATE ENGINE MUSTACHE
app.engine('mst',mustache(__dirname+'/views/partials','.mst'));
app.set('view engine','mst');
app.set('views',__dirname + '/views');

module.exports = app;