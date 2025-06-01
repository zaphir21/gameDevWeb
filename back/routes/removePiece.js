const express = require('express');
const router = express.Router();
const { Player, sequelize} = require('../models/Player');

router.post('/remove/piece/user', async (req, res) => {
    let { PSEUDO, PIECE } = req.body;
    PSEUDO = PSEUDO?.toUpperCase();
    
    try {
        console.log("Réception de la requête avec PSEUDO:", PSEUDO, "et PIECE:", PIECE);

        const playerFetched = await Player.findOne({ where: { PSEUDO: PSEUDO } });

        if (!playerFetched) {
            console.error('❌ Joueur non trouvé.');
            return res.status(404).json({ error: 'Joueur non trouvé' });
        }

        if (playerFetched.PIECE >= PIECE) { 
            playerFetched.PIECE = PIECE;
            await playerFetched.save();
        }

        console.log("🔄 Envoi de la réponse au client...");
        return res.json({ PIECE: playerFetched.PIECE });
    } catch (error) {
        console.error('❌ Erreur de connexion:', error);
        return res.status(500).json({ error: 'Erreur de connexion' });
    }
});


module.exports = router;
