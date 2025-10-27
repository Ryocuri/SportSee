# Guide d'intégration de l'API

Ce document explique comment basculer des données mockées vers l'API réelle.

## État actuel

L'application utilise actuellement des **données mockées** pour le développement. Cela permet de tester l'interface sans avoir besoin du backend en cours d'exécution.

## Prérequis pour l'intégration API

1. Le backend doit être lancé et accessible à `http://localhost:3000`
2. Les endpoints suivants doivent être disponibles :
   - `GET /user/:id`
   - `GET /user/:id/activity`
   - `GET /user/:id/average-sessions`
   - `GET /user/:id/performance`

## Étapes pour activer l'API réelle

### 1. Vérifier que le backend est lancé

```bash
cd SportSee
npm install
npm run dev
```

Le backend devrait afficher :
```
Server is running on port 3000
```

### 2. Modifier le service de données

Ouvrez le fichier `src/services/dataService.js` et modifiez la constante :

```javascript
// Ligne 13
const USE_MOCKED_DATA = false // Changez de true à false
```

### 3. Tester l'intégration

1. Redémarrez l'application frontend si nécessaire
2. Accédez à `http://localhost:5174`
3. Testez avec les deux utilisateurs disponibles :
   - Karl Dovineau (ID: 12)
   - Cecilia Ratorez (ID: 18)

## Résolution des problèmes

### Erreur CORS

Si vous rencontrez des erreurs CORS, vérifiez que le backend a bien le middleware CORS activé :

```javascript
// Dans SportSee/app/index.js
const cors = require('cors')
app.use(cors())
```

### Utilisateur non trouvé

L'API ne contient que les utilisateurs avec les IDs **12** et **18**. Tenter d'accéder à d'autres IDs retournera une erreur.

### Données non standardisées

Le service `dataService.js` inclut des fonctions de standardisation qui gèrent automatiquement :
- Les différences entre `score` et `todayScore`
- La traduction des labels de performance en français
- Le formatage des dates pour les graphiques

## Format des données attendues

### User Data (GET /user/:id)
```json
{
  "data": {
    "id": 12,
    "userInfos": {
      "firstName": "Karl",
      "lastName": "Dovineau",
      "age": 31
    },
    "todayScore": 0.12,
    "keyData": {
      "calorieCount": 1930,
      "proteinCount": 155,
      "carbohydrateCount": 290,
      "lipidCount": 50
    }
  }
}
```

### Activity Data (GET /user/:id/activity)
```json
{
  "data": {
    "userId": 12,
    "sessions": [
      {
        "day": "2020-07-01",
        "kilogram": 80,
        "calories": 240
      }
    ]
  }
}
```

### Average Sessions (GET /user/:id/average-sessions)
```json
{
  "data": {
    "userId": 12,
    "sessions": [
      {
        "day": 1,
        "sessionLength": 30
      }
    ]
  }
}
```

### Performance (GET /user/:id/performance)
```json
{
  "data": {
    "userId": 12,
    "kind": {
      "1": "cardio",
      "2": "energy",
      "3": "endurance",
      "4": "strength",
      "5": "speed",
      "6": "intensity"
    },
    "data": [
      {
        "value": 80,
        "kind": 1
      }
    ]
  }
}
```

## Retour aux données mockées

Si vous souhaitez revenir aux données mockées (par exemple pour le développement sans backend), modifiez simplement :

```javascript
const USE_MOCKED_DATA = true // dans src/services/dataService.js
```

## Notes importantes

- **La standardisation des données est automatique** : Vous n'avez rien à changer dans les composants
- **Gestion d'erreur incluse** : Si l'API est inaccessible, un message d'erreur s'affichera
- **Performance** : Les données sont chargées en parallèle avec `Promise.all` pour optimiser les performances

## Tests recommandés après intégration

1. ✅ Vérifier que les données des deux utilisateurs s'affichent correctement
2. ✅ Tester les graphiques avec les données réelles
3. ✅ Vérifier que les tooltips affichent les bonnes valeurs
4. ✅ Tester la gestion d'erreur (arrêter le backend et vérifier l'affichage)
5. ✅ Vérifier les performances de chargement

## Support

En cas de problème :
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez les logs du serveur backend
3. Utilisez les outils de développement React pour inspecter les props des composants