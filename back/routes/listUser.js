const express = require('express');
const router = express.Router();
const { Player, sequelize} = require('../models/Player');

router.get('/list/users', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion réussie.');

        const players = await Player.findAll();
        res.json(players);
    } catch (error) {
        console.error('❌ Erreur de connexion:', error);
        res.json({ error: '❌ Erreur de connexion' });
    }
});
module.exports = router;
