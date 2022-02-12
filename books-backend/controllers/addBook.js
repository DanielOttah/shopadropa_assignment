const addNewBook = (req, res, db, next) => {
    try {
        const txt = `SELECT * FROM books`;
        db.query(txt, function (error, results, fields) {
            if (error) next(error)
            for (let i = 0; i < results.length; i++) {
                if (results[i].isbn == req.body.isbn) {
                    res.json("Book already exists")

                }
            }
            const txt = "INSERT INTO books (author,name,year_of_publish, isbn, link, synopsis) VALUES (?,?,?,?, ?, ?)";

            let vals = [req.body.author, req.body.name, req.body.yearOfPublication, req.body.isbn, req.body.link, req.body.synopsis];

            db.query(txt, vals, function (error, results, fields) {
                if (error) throw error;
                res.json(results.affectedRows);
            })
        })
    } catch (err) {
        next(err)
    }

}

module.exports = {
    addNewBook: addNewBook
};