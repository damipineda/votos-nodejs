const db = require('../models/db');

// CRUD y votaciones
exports.getCards = (req, res) => {
    db.all(`SELECT * FROM cards ORDER BY likes DESC`, (err, rows) => {
        if (err) throw err;
        res.render('index', { cards: rows });
    });
};

exports.createCard = (req, res) => {
    const { content } = req.body;
    db.run(`INSERT INTO cards (content) VALUES (?)`, [content], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.updateCard = (req, res) => {
    const { id, content } = req.body;
    db.run(`UPDATE cards SET content = ? WHERE id = ?`, [content, id], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.deleteCard = (req, res) => {
    const { id } = req.body;
    db.run(`DELETE FROM cards WHERE id = ?`, [id], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.likeCard = (req, res) => {
    const { id } = req.body;
    db.run(`UPDATE cards SET likes = likes + 1 WHERE id = ?`, [id], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};