const updateBook = (req, res, db, next) => {
    try {
        const txt = "UPDATE books SET author = ?, name=?, year_of_publish=?, isbn=?, link=?, synopsis = ? WHERE id = ?";
        const val = [req.body.author, req.body.name, req.body.yearOfPublication, req.body.isbn, req.body.link, req.body.synopsis, req.body.id]

        db.query(txt, val, function (error, results, fields) {
            if (error) throw error;
            res.json(results.affectedRows);
        })

    } catch (err) {
        next(err)
    }
}
module.exports = {
    updateBook: updateBook
};