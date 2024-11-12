const db = require('../models/db');

// CRUD y votaciones
//Generar una tarjeta nueva
exports.getCards = (req, res) => {
    db.all(`SELECT * FROM cards ORDER BY likes DESC`, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener las cards');
        }
        res.render('index', { cards: rows });
    });
};
//Crud para creat un un tarjeta neuva
exports.createCard = (req, res) => {
    const { title, description, content } = req.body;
    db.run(`
        INSERT INTO cards (title, description, content, likes, deslikes) 
        VALUES (?, ?, ?, 0, 0)
    `, [title, description, content], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};
//Crud para editata la tarjeta 
exports.updateCard = (req, res) => {
    const { id, content } = req.body;
    db.run(`UPDATE cards SET content = ? WHERE id = ?`, [content, id], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};
//Crud para eliminar la tarjeta
exports.deleteCard = (req, res) => {
    const { id } = req.body;
    db.run(`DELETE FROM cards WHERE id = ?`, [id], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};
//contador de likes en la tarjeta
exports.likeCard = (req, res) => {
    const { id } = req.body;
    db.run(`UPDATE cards SET likes = likes + 1 WHERE id = ?`, [id], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};
//Contador de deslike en la tarjeta
exports.dislikeCard = (req, res) => {
    const { id } = req.body;
    db.run(`UPDATE cards SET deslikes = deslikes + 1 WHERE id = ?`, [id], function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};