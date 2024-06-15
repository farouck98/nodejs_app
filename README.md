# Description

Cette application met en place un serveur nodeJS capable de simuler et surveiller les positions
des véhicules en temps réel.

# Accédez au répertoire du projet

cd 3npm_project

# Installez les dépendances

Initialisez le projet Node.js : npm init -y
Installez Express : npm install express
Installez jsonwebtoken : npm install jsonwebtoken
Installez fs : npm install fs
Installez events : npm install events
Installez cookie-parser : npm install cookie-parser
Installez Socket.IO : npm install socket.io
Installez Mongoose : npm install mongoose
Installez express-validator : npm install express-validator
Installez bcrypt pour le hashage des mots de passe : npm install bcrypt

# lancez le server:

Pour démarrer le serveur, exécutez la commande: node server.js

le serveur sera accessible sur le port 3001

# Etapes pour tester avec Postman:

1.  Ouvrir Postman après l'avoir téléchargé:
    Lancez l'application Postman sur votre ordinateur

2.  Créez une nouvelle requête:
    Cliquez sur le bouton 'New' en haut à gauche et sélectionnez HTTP

3.  Nommer les requêtes:
    - Par exemple donnez le nom "user registration" pour la création d'un utilisateur et
    créez une collection nommée users.
    
    - Par exemple donnez le nom "user authentification" pour la connexion d'un utilisateur et
    ajoutez la à la collection users précédemment créée.
    
    - Par exemple donnez le nom "user logout" pour la connexion d'un utilisateur et
    ajoutez la à la collection users précédemment créée.
    
    - Par exemple donnez le nom "add vehicle Position" pour l'ajout des données de postion
    d'un véhicule et créez une collection nommée vehiclePositions.
    
    - Par exemple donnez le nom "get vehicle Position" récupérer les données de position des
    voitures ajoutez la à la collection vehiculePositions précédemment créée.

   4. Configurez les requêtes:
      - Pour la requête user registration par exemple:
      # Sélectionnez POST comme requête HTTP et entrez l'URL: http://localhost:3001/api/users/register
      # Ajoutez les entêtes : Dans l'onglet 'Headers', ajoutez en entête 'Content type' avec la valeur 'application/json'
      # Ajoutez le corps de la requête : Allez dans l'onglet 'Body', sélectionnez 'raw' et choisissez 'JSON' dans le menu déroulant
      # Ajoutez un exemple de corps de requête JSON avec les champs requis, par exemple:
          {
            "email": "votre_email@example.com",
            "password": "votre_mot_de_passe"
          }
      # Envoyez la requête: 
      Cliquez le bouton 'Send' à l'eXtrême droite
      Vous devriez recevoir une réponse avec le statut 201 Created et un message de succès,
      par exemple :
      {
          "message": "Utilisateur créé avec succès"
      }

       - Pour la requête user authentification par exemple:
      # Sélectionnez POST comme requête HTTP et entrez l'URL: http://localhost:3001/api/users/login
      # Ajoutez les entêtes : Dans l'onglet 'Headers', ajoutez en entête 'Content type' avec la valeur 'application/json'
      # Ajoutez le corps de la requête : Allez dans l'onglet 'Body', sélectionnez 'raw' et choisissez 'JSON' dans le menu déroulant
      # Ajoutez un exemple de corps de requête JSON avec les champs requis, par exemple:
          {
            "email": "votre_email@example.com",
            "password": "votre_mot_de_passe"
          }

       - Pour la requête user logout par exemple:
      # Sélectionnez POST comme requête HTTP et entrez l'URL: http://localhost:3001/api/users/logout
      # Envoyez la requête:
      Cliquez le bouton 'Send' à l'eXtrême droite
      Vous devriez recevoir une réponse avec le statut 200 OK et un message de succès,
      par exemple :
      {
            "message": "Utilisateur déconnecté avec succès"
      }
       - Pour la requête add vehicle position par exemple:
      # Sélectionnez POST comme requête HTTP et entrez l'URL: http://localhost:3001/api/uehicles/add-position
      # Ajoutez le corps de la requête : Allez dans l'onglet 'Body', sélectionnez 'raw' et choisissez 'JSON' dans le menu déroulant
      # Ajoutez un exemple de corps de requête JSON avec les champs requis, par exemple:
      {
         "vehicleId": "123ABC",
         "position": {
                       "lat": 40.7128,
                       "lon": -74.0060
                      }
      }
      # Envoyez la requête:
      Cliquez le bouton 'Send' à l'eXtrême droite
      Vous devriez recevoir une réponse avec le statut 201 Created et un message de succès,
      par exemple :
      {
      "message": "Positions du véhicule ajoutées avec succès"
      }
       - Pour la requête get vehicle position par exemple:
      # Sélectionnez GET comme requête HTTP et entrez l'URL: http://localhost:3001/api/vehicles/positions
      # Aucun header nécessaire, mais assurez-vous que auth-token est envoyé comme cookie (Postman le gère automatiquement si vous êtes authentifié)
      # Envoyez la requête:
      Cliquez le bouton 'Send' à l'eXtrême droite
      Vous devriez recevoir une réponse avec le statut 200 Ok et un tableau JSON avec les 
      positions des véhicules.
      


