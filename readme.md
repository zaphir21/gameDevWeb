## Routes de l'API
  - [Top joueurs](#top-joueurs)
  - [Insertion d'un utilisateur](#insertion-dun-utilisateur)
  - [Liste des utilisateurs](#liste-des-utilisateurs)
### 📌 Top joueurs
- **URL** : `/top/users`
- **Méthode** : `GET`
- **Description** : Récupère les **5** meilleurs joueurs par défaut, ou un nombre défini via un paramètre.
- **Paramètre** : `?nbr=6` *(optionnel, définit le nombre de joueurs retournés)*
- **Réponse** :
  ```json
  [
    {
      "SPEED": 100,
      "TIME": 800,
      "PSEUDO": "Zaphir",
      "PIECE": 10
    },
    {
      "SPEED": 400,
      "TIME": 600,
      "PSEUDO": "USER9",
      "PIECE": 2
    }
  ]
  ```

### 📝 Insertion d'un utilisateur
- **URL** : `/insert/user`
- **Méthode** : `POST`
- **Description** : Ajoute un nouvel utilisateur à la base de données.
- **Corps de la requête** :
  ```json
  {
    "SPEED": 100,
    "TIME": 800,
    "PSEUDO": "Zaphir",
    "PIECE": 10
  }
  ```

### 📋 Liste des utilisateurs
- **URL** : `/list/users`
- **Méthode** : `GET`
- **Description** : Récupère la liste complète des utilisateurs enregistrés.
- **Réponse** :
  ```json
  [
    {
      "SPEED": 100,
      "TIME": 800,
      "PSEUDO": "Zaphir",
      "PIECE": 10
    },
    {
      "SPEED": 400,
      "TIME": 600,
      "PSEUDO": "USER9",
      "PIECE": 2
    }
  ]
  ```

---