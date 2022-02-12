var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors')
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/books', booksRouter);


//  ============= Error Handler ===============

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);

})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });

})
//============================================


module.exports = app;
