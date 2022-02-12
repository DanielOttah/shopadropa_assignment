var express = require('express');
var router = express.Router();
const mysql = require('mysql');
require('dotenv').config()
const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));


//=============== DataBase Connection ==================
let client;
//Keep Connection alive
const keepconnection = () => {
  client = new mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.IP_AD,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
    port: 3306,
    insecureAuth: true
  });
  client.connect((err) => {
    if (err) setTimeout(keepconnection, 2000)
  });

  client.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      keepconnection();
    } else {
      throw err;
    }
  })
}
keepconnection();

const getAllBooks = require('../controllers/getAllBooks');
const addNewBook = require('../controllers/addBook');
const deleteBook = require('../controllers/deleteBook');
const UpdateBook = require('../controllers/updateBook');

/* get all book. */
router.get('/get_all_books', (req, res, next) => {
  try {
    getAllBooks.getAllBooks(req, res, client, next);
  } catch (err) {
    next(err);
  }
});
/* Create a book. */
router.post('/create_book', (req, res, next) => {
  try {
    addNewBook.addNewBook(req, res, client, next);
  } catch (err) {
    next(err);
  }
});

/* Delete a book. */
router.post('/delete_book', (req, res, next) => {
  try {
    deleteBook.deleteBook(req, res, client, next);
  } catch (err) {
    next(err);
  }
});

/* Update a book. */
router.post('/update_book', (req, res, next) => {
  try {
    UpdateBook.updateBook(req, res, client, next);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
