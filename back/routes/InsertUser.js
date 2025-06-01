const express = require('express');
const router = express.Router();
const { Player, sequelize} = require('../models/Player');

router.get('/insert/user', async (req, res) => {
    const SPEED = req.query.SPEED
    const TIME = req.query.TIME
    let PSEUDO = req.query.PSEUDO
    const PIECE = req.query.PIECE
    PSEUDO = PSEUDO?.toUpperCase();
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion réussie.');

        const newPlayer = await Player.create({
            SPEED: SPEED,
            TIME: TIME,
            PSEUDO: PSEUDO,
            PIECE: PIECE
        });

        res.json(newPlayer.toJSON());
    } catch (error) {
        try{
            const playerFetched = await Player.findOne({ where: { PSEUDO: PSEUDO } });
            if (playerFetched) {
                if(playerFetched.TIME < TIME) {
                    playerFetched.TIME = TIME;
                    playerFetched.SPEED = SPEED;
                }
                playerFetched.PIECE = PIECE;
                await playerFetched.save();
                res.json(playerFetched.toJSON());
            } else {
                console.error('❌ Joueur non trouvé.');
            }
        }catch (error){
            console.error('❌ Erreur de connexion:', error);
            res.json({ error: '❌ Erreur de connexion' });
        }
    }
});

module.exports = router;
