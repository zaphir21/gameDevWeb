const express = require('express');
const router = express.Router();
const { Player, sequelize} = require('../models/Player');

router.get('/top/users/piece', async (req, res) => {
    try {

        const nbr = req.query.nbr ? parseInt(req.query.nbr, 10) : 5;

        await sequelize.authenticate();
        console.log('✅ Connexion réussie.');

        const players = await Player.findAll();
        players.sort((a, b) => b.PIECE - a.PIECE);

        res.json(players.slice(0, nbr));
    } catch (error) {
        console.error('❌ Erreur de connexion:', error);
        res.json({ error: '❌ Erreur de connexion' });
    }
});
module.exports = router;
