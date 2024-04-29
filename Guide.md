# Documentation Serveur

Cette documentation fournit des informations sur le côté serveur du site internet, y compris la structure des fichiers, les routes API et les requêtes correspondantes.

## Arborescence des Fichiers

C:.
│   package-lock.json
│   package.json
│   server.js
│
├───models
│       Article.js
│       Reservation.js
│
├───public
│   ├───css
│   ├───images
│   ├───js
│   │       blog.js
│   │       blogAdmin.js
│   │       reservation.js
│   │       reservationAdmin.js
│   │       script.js
│   │
│   └───views
│           admin.ejs
│           blog.ejs
│           blogAdmin.ejs
│           index.ejs
│           navbar.ejs
│           reservation.ejs
│           reservationAdmin.ejs
│
└───routes
        articleRoutes.js
        reservationsRoutes.js
        semainesRoutes.js

## Fichiers Importants

### `server.js`

Ce fichier contient la configuration principale du serveur, y compris la connexion à la base de données, la définition des middlewares, des moteurs de vue et des routes.

### `articleRoutes.js`

Ce fichier contient les routes API pour les opérations CRUD (create, read, update, delete) sur les articles du blog.

### `reservationRoutes.js`

Ce fichier contient les routes API pour les opérations CRUD sur les réservations.

### `semainesRoutes.js`

Ce fichier contient les routes API pour récupérer les semaines.

## Configuration Serveur

Le serveur utilise Express.js et MongoDB.

## Routes API

- `/articles`: Routes pour les opérations CRUD sur les articles du blog.
- `/reservations`: Routes pour les opérations CRUD sur les réservations.
- `/semaines`: Routes pour récupérer les semaines.

## Dossiers Views et JS

### Dossier `views`

Le dossier `views` contient les fichiers de modèles de vue utilisés pour générer les pages HTML du site. Voici une brève description de chaque fichier :

- `admin.ejs`: Page d'accueil de l'interface d'administration.
- `blog.ejs`: Page principale du blog, affichant la liste des articles.
- `blogAdmin.ejs`: Interface d'administration pour gérer les articles du blog.
- `index.ejs`: Page d'accueil de votre site.
- `reservation.ejs`: Page de réservation de semaine pour les utilisateurs.
- `reservationAdmin.ejs`: Interface d'administration pour gérer les réservations de semaine.

### Dossier `js`

Le dossier `js` contient les fichiers JavaScript qui fournissent la logique côté client pour différentes fonctionnalités. Voici une brève description de chaque fichier :

- `blog.js`: Gère l'affichage des articles sur la page principale du blog.
- `blogAdmin.js`: Gère les fonctionnalités d'administration pour créer, modifier et supprimer des articles du blog.
- `reservation.js`: Gère la logique de réservation de semaine pour les utilisateurs.
- `reservationAdmin.js`: Gère l'affichage et la gestion des réservations de semaine dans l'interface d'administration.
