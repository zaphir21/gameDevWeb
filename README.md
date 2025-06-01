# Slime Dash

Slime Dash est un jeu développé dans le cadre d'un hackathon organisé pendant un cours. Nous avions **deux semaines** pour créer un jeu intégrant une **base de données**, avec comme principale contrainte qu'il devait être **exécutable dans un navigateur**.

## Technologies utilisées
- **PIXI.js** (moteur de rendu graphique)
- **JavaScript** (langage principal)
- **HTML/CSS** (interface utilisateur)
- **Node.js** (serveur backend)

---

## Sommaire
- [Installation et Lancement](#installation-et-lancement)
- [Routes de l'API](back/readme.md)
- [Crédits](#credits)

---

## Installation et Lancement

### 1. Lancer le serveur frontend
Le frontend doit être exécuté avec un serveur local Python :
```bash
python -m http.server -d front
```

### 2. Lancer le serveur backend
Assurez-vous d'avoir **Node.js** installé, puis exécutez les commandes suivantes :
```bash
cd back
npm install
node server.js
```
Le serveur backend est maintenant accessible à l'adresse **`http://localhost:8080`**.

---

## 📌 Remarques
- Assurez-vous que le serveur backend est bien démarré avant d'exécuter des requêtes.
- Le jeu utilise **PIXI.js** pour le rendu graphique, donc un navigateur récent est recommandé pour une meilleure expérience.

---



