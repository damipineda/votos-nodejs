const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/', cardController.getCards);
router.post('/create', cardController.createCard);
router.post('/update', cardController.updateCard);
router.post('/delete', cardController.deleteCard);
router.post('/like', cardController.likeCard);

module.exports = router;