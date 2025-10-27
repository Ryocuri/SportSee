# SportSee - Frontend Application

Application frontend React pour SportSee, une startup dédiée au coaching sportif. Cette application permet aux utilisateurs de suivre leurs activités sportives, sessions, performances et données nutritionnelles.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement du projet](#lancement-du-projet)
- [Structure du projet](#structure-du-projet)
- [Configuration](#configuration)
- [API](#api)
- [Utilisation](#utilisation)
- [Documentation](#documentation)

## 🎯 Fonctionnalités

- **Page d'accueil** : Sélection de l'utilisateur
- **Dashboard utilisateur** : 
  - Affichage du prénom de l'utilisateur
  - Graphique d'activité quotidienne (poids et calories brûlées)
  - Graphique de durée moyenne des sessions
  - Graphique de performance (radar chart)
  - Score de l'objectif du jour
  - Cartes de données clés (Calories, Protéines, Glucides, Lipides)

## 🛠 Technologies utilisées

- **React 18** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **Vite** - Build tool et dev server
- **React Router DOM** - Gestion du routing
- **Recharts** - Bibliothèque de graphiques pour React
- **Axios** - Client HTTP pour les appels API
- **PropTypes** - Validation des props
- **CSS3** - Styling

## 📦 Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)

## 🚀 Installation

1. Clonez le repository :
```bash
git clone <repository-url>
cd sportsee-frontend
```

2. Installez les dépendances :
```bash
npm install
```

## ▶️ Lancement du projet

### Mode développement

Pour lancer l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

### Build de production

Pour créer un build de production :

```bash
npm run build
```

Pour prévisualiser le build de production :

```bash
npm run preview
```

## 📁 Structure du projet

```
sportsee-frontend/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/        # Composants React réutilisables
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── KeyDataCard.jsx
│   │   ├── ActivityChart.jsx
│   │   ├── AverageSessionsChart.jsx
│   │   ├── PerformanceChart.jsx
│   │   └── ScoreChart.jsx
│   ├── pages/            # Pages de l'application
│   │   ├── Home.jsx
│   │   └── Dashboard.jsx
│   ├── services/         # Services et logique métier
│   │   └── dataService.js
│   ├── data/            # Données mockées
│   │   └── mockedData.js
│   ├── App.jsx          # Composant principal
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── package.json
└── README.md
```

## ⚙️ Configuration

### Basculer entre données mockées et API réelle

Dans le fichier `src/services/dataService.js`, vous pouvez basculer entre les données mockées et l'API réelle :

```javascript
const USE_MOCKED_DATA = true // true pour données mockées, false pour API réelle
```

### Configuration de l'API

L'URL de base de l'API peut être modifiée dans `src/services/dataService.js` :

```javascript
const API_BASE_URL = 'http://localhost:3000'
```

## 🔌 API

### Backend

Le backend doit être lancé séparément. Consultez la documentation du backend dans le dossier `SportSee/`.

Pour lancer le backend :

```bash
cd SportSee
npm install
npm run dev
```

Le backend sera accessible à : `http://localhost:3000`

### Endpoints disponibles

- `GET /user/:id` - Récupère les informations principales d'un utilisateur
- `GET /user/:id/activity` - Récupère l'activité quotidienne d'un utilisateur
- `GET /user/:id/average-sessions` - Récupère les sessions moyennes d'un utilisateur
- `GET /user/:id/performance` - Récupère les performances d'un utilisateur

**Note** : Seuls les utilisateurs avec les IDs **12** et **18** sont disponibles.

## 💻 Utilisation

1. Lancez le backend (voir section API)
2. Lancez l'application frontend avec `npm run dev`
3. Accédez à `http://localhost:5173`
4. Sélectionnez un utilisateur (Karl Dovineau - ID: 12 ou Cecilia Ratorez - ID: 18)
5. Consultez le dashboard avec toutes les données de l'utilisateur

### URLs disponibles

- `/` - Page d'accueil avec sélection utilisateur
- `/user/12` - Dashboard de Karl Dovineau
- `/user/18` - Dashboard de Cecilia Ratorez

## 📖 Documentation

### Composants principaux

#### Dashboard
Le composant principal qui affiche toutes les informations de l'utilisateur :
- En-tête avec le prénom de l'utilisateur
- Message de félicitation
- Graphiques d'activité
- Cartes de données nutritionnelles

#### Charts
- **ActivityChart** : Graphique en barres montrant l'activité quotidienne
- **AverageSessionsChart** : Graphique en ligne montrant la durée moyenne des sessions
- **PerformanceChart** : Graphique radar montrant les performances
- **ScoreChart** : Graphique radial montrant le score de l'objectif

#### Service de données
Le service `dataService.js` gère :
- Les appels API
- La standardisation des données
- Le basculement entre données mockées et API réelle
- La gestion des erreurs

### Standardisation des données

Toutes les données passent par une couche de standardisation pour :
- Gérer les différences de schéma entre utilisateurs (score vs todayScore)
- Formater les données pour les graphiques
- Traduire les labels (ex: kind en français)

## 🎨 Design

L'application est conçue pour être utilisée sur desktop avec une résolution minimale de **1024x780 pixels**.

Les couleurs principales :
- Rouge primaire : `#FF0101` / `#E60000`
- Noir : `#020203` / `#282D30`
- Gris : `#74798C` / `#9B9EAC`
- Blanc : `#FFFFFF`
- Fond : `#FBFBFB`

## 📝 Notes de développement

### Bonnes pratiques implémentées

- **Séparation des préoccupations** : Services séparés des composants
- **Réutilisabilité** : Composants modulaires et réutilisables
- **PropTypes** : Validation des props pour tous les composants
- **JSDoc** : Documentation des fonctions principales
- **Gestion d'erreur** : Gestion appropriée des erreurs et états de chargement
- **Responsive design** : Media queries pour s'adapter aux différentes tailles d'écran

### Améliorations futures possibles

- Tests unitaires et d'intégration
- Gestion de l'authentification
- Version mobile et tablette
- Animations et transitions
- Mode sombre
- Internationalisation (i18n)

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet fait partie du parcours de formation OpenClassrooms.

## 👥 Auteurs

Développé dans le cadre du projet 12 du parcours Développeur d'application JavaScript React d'OpenClassrooms.

---

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.
