const getAllBooks = (req, res, db, next) => {
    try {
        const txt = `SELECT * FROM books`;
        db.query(txt, (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllBooks: getAllBooks
};