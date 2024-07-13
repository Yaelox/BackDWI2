const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonControllers');

router.get('/:id', pokemonController.getPokemonById);

module.exports = router;
