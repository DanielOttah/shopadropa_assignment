const deleteBook = (req, res, db, next) => {
    try {
        const txt = "DELETE FROM books WHERE id = ?";
        const val = req.body.id;
        db.query(txt, val, function (error, results, fields) {
            if (error) throw error;
            res.json(results.affectedRows);
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    deleteBook: deleteBook
};

