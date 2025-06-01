const express = require('express');
const router = express.Router();
const { Player, sequelize } = require('../models/Player');

router.get('/search/user/:pseudo', async (req, res) => {
    let pseudo = req.params.pseudo;
    console.log(pseudo);

    if (pseudo) {
        pseudo = pseudo.toUpperCase();
    }

    try {
        const playerFetched = await Player.findOne({ where: { PSEUDO: pseudo } });
        if (playerFetched) {
            res.json(playerFetched.toJSON());
        } else {
            const newPlayer = await Player.create({
                SPEED: 0,
                TIME: 0,
                PSEUDO: pseudo,
                PIECE: 0
            });
            res.json(newPlayer.toJSON());
        }
    } catch (error) {
        console.error('❌ Erreur de connexion:', error);
        res.status(500).json({ error: '❌ Erreur de connexion' });
    }
});

module.exports = router;
