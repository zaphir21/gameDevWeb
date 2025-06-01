const express = require('express');
const insertUser = require('./routes/InsertUser');
const listUser = require('./routes/listUser');
const topUserTime = require('./routes/topUserTime');
const topUserPiece = require('./routes/topUserPiece');
const searchUser = require('./routes/searchUser');
const removePiece = require('./routes/removePiece');
const cors = require('cors');
const app = express();

//A INSTALLER POUR EVITER QU'ON PUISSE ACCEDER A L'API DEPUIS UNE PAGE AUTRE QUE CELUI DE L'APPLICATION
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.includes('.visualstudio.com') || origin.includes('127.0.0.1') || origin.includes('localhost') || origin.includes('0.0.0.0')) { 
            
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Autorise toutes les méthodes HTTP
    allowedHeaders: "Content-Type,Authorization", // Autorise les headers utiles
    credentials: true // IMPORTANT : Autorise les requêtes avec credentials (cookies, auth)
}));

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    if (req.method === "POST") {
        console.log("Body reçu:", req.body);
    }
    next();
});
app.options('*', cors()); 
app.use(express.json())
//Initialisation des routes
app.use(insertUser);
app.use(listUser);
app.use(topUserTime);
app.use(searchUser);
app.use(topUserPiece);
app.use(removePiece);


//Lancement du serveur
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
