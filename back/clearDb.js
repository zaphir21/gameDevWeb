const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, './Database.db')
});

const Player = sequelize.define('Player', {
    SPEED: { type: DataTypes.INTEGER, allowNull: false },
    TIME: { type: DataTypes.INTEGER, allowNull: false },
    PSEUDO: { type: DataTypes.STRING(50), primaryKey: true, allowNull: false },
    PIECE: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'PLAYERS',
    timestamps: false  // Désactive `createdAt` et `updatedAt`
});

//clear the database
(async () => {
    await sequelize.sync(); // S'assure que la connexion est active
    await Player.truncate(); // Vide la table
    console.log('Table Player vidée avec succès.');
    await sequelize.close(); // Ferme la connexion proprement
})();
