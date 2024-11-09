const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/', cardController.getCards);
router.post('/create', cardController.createCard);
router.post('/update', cardController.updateCard);
router.post('/delete', cardController.deleteCard);
router.post('/like', cardController.likeCard);
// Ruta para manejar el dislike
router.post('/no-like', cardController.dislikeCard);

const db = require('../models/db');

exports.getCards = (req, res) => {
    db.all(`SELECT * FROM cards ORDER BY likes DESC`, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener las cards');
        }
        // Asegúrate de que estás pasando 'rows' como 'cards'
        res.render('index', { cards: rows });
    });
};

module.exports = router;