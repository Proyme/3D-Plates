# 🤝 Guide de Contribution - 3D-Plates

Merci de votre intérêt pour contribuer à 3D-Plates ! Ce document vous guidera à travers le processus de contribution.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Processus de Développement](#processus-de-développement)
- [Standards de Code](#standards-de-code)
- [Soumettre une Pull Request](#soumettre-une-pull-request)
- [Signaler un Bug](#signaler-un-bug)
- [Proposer une Fonctionnalité](#proposer-une-fonctionnalité)

## 📜 Code de Conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite :

- Soyez respectueux et inclusif
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est meilleur pour la communauté
- Faites preuve d'empathie envers les autres membres

## 🚀 Comment Contribuer

Il existe plusieurs façons de contribuer :

### 1. Signaler des Bugs 🐛
Trouvé un bug ? Ouvrez une issue avec :
- Description claire du problème
- Étapes pour reproduire
- Comportement attendu vs actuel
- Screenshots si applicable
- Environnement (OS, versions, etc.)

### 2. Proposer des Fonctionnalités 💡
Vous avez une idée ? Ouvrez une issue avec :
- Description détaillée de la fonctionnalité
- Cas d'usage
- Bénéfices pour les utilisateurs
- Maquettes ou exemples si possible

### 3. Améliorer la Documentation 📚
- Corriger des typos
- Clarifier des instructions
- Ajouter des exemples
- Traduire en d'autres langues

### 4. Contribuer du Code 💻
- Corriger des bugs
- Implémenter des fonctionnalités
- Optimiser les performances
- Ajouter des tests

## 🔄 Processus de Développement

### 1. Fork et Clone

```bash
# Fork le repository sur GitHub
# Puis clonez votre fork
git clone https://github.com/VOTRE-USERNAME/3D-Plates.git
cd 3D-Plates
```

### 2. Créer une Branche

```bash
# Créez une branche pour votre contribution
git checkout -b feature/ma-nouvelle-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

**Convention de nommage des branches :**
- `feature/` : Nouvelles fonctionnalités
- `fix/` : Corrections de bugs
- `docs/` : Documentation
- `refactor/` : Refactoring
- `test/` : Ajout de tests

### 3. Développer

```bash
# Installez les dépendances
npm install
cd server && pip install -r requirements.txt

# Développez votre contribution
# Testez localement
```

### 4. Commit

```bash
# Ajoutez vos changements
git add .

# Commit avec un message descriptif
git commit -m "feat: ajout de la fonctionnalité X"
```

**Convention de commit :**
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, pas de changement de code
- `refactor:` Refactoring
- `test:` Ajout de tests
- `chore:` Maintenance

### 5. Push et Pull Request

```bash
# Push vers votre fork
git push origin feature/ma-nouvelle-fonctionnalite

# Créez une Pull Request sur GitHub
```

## 📏 Standards de Code

### JavaScript/React Native

```javascript
// ✅ BON
const MyComponent = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  
  const handlePress = async () => {
    try {
      setLoading(true);
      await someAsyncOperation();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

// ❌ MAUVAIS
function MyComponent(props) {
  var loading = false;
  return <View><Text>Hello</Text></View>
}
```

**Règles :**
- Utilisez des composants fonctionnels
- Hooks pour la gestion d'état
- Nommage camelCase pour variables/fonctions
- PascalCase pour composants
- Indentation 2 espaces
- Toujours gérer les erreurs
- Commentaires pour logique complexe

### Python/Flask

```python
# ✅ BON
def process_video(video_path: Path) -> Path:
    """
    Process video and extract frames.
    
    Args:
        video_path: Path to input video
        
    Returns:
        Path to output directory
        
    Raises:
        ValueError: If video format is invalid
    """
    try:
        # Implementation
        return output_path
    except Exception as e:
        logger.error(f"Error processing video: {e}")
        raise

# ❌ MAUVAIS
def process(v):
    # No docstring, no types, no error handling
    return output
```

**Règles :**
- Type hints pour fonctions
- Docstrings pour fonctions publiques
- Nommage snake_case
- Indentation 4 espaces
- Logging approprié
- Gestion d'erreurs explicite

### Styles (React Native)

```javascript
// ✅ BON
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
});

// ❌ MAUVAIS
const styles = {
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' }
}
```

**Règles :**
- Utilisez StyleSheet.create()
- Couleurs en hexadécimal
- Valeurs numériques sans unités
- Organisation logique des propriétés

## 🔍 Checklist Pull Request

Avant de soumettre votre PR, vérifiez :

- [ ] Le code compile sans erreurs
- [ ] Les tests passent (si applicable)
- [ ] La documentation est à jour
- [ ] Le code suit les standards du projet
- [ ] Les commits sont bien formatés
- [ ] Pas de console.log() oubliés
- [ ] Pas de code commenté inutile
- [ ] Les nouvelles fonctionnalités sont documentées

## 📝 Template Pull Request

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Comment tester
1. Étape 1
2. Étape 2
3. Résultat attendu

## Screenshots (si applicable)
[Ajoutez des screenshots]

## Checklist
- [ ] Code testé localement
- [ ] Documentation mise à jour
- [ ] Pas de warnings
```

## 🐛 Signaler un Bug

### Template Issue Bug

```markdown
## Description du Bug
Description claire et concise

## Étapes pour Reproduire
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement Attendu
Ce qui devrait se passer

## Comportement Actuel
Ce qui se passe réellement

## Screenshots
[Si applicable]

## Environnement
- OS: [e.g. Windows 11]
- Node: [e.g. 20.10.0]
- Expo: [e.g. 54.0.17]
- Téléphone: [e.g. iPhone 14, Android 13]

## Logs
```
[Collez les logs d'erreur]
```

## Informations Additionnelles
Tout autre contexte utile
```

## 💡 Proposer une Fonctionnalité

### Template Issue Feature

```markdown
## Fonctionnalité Proposée
Description claire de la fonctionnalité

## Problème Résolu
Quel problème cette fonctionnalité résout-elle ?

## Solution Proposée
Comment devrait-elle fonctionner ?

## Alternatives Considérées
Autres approches possibles

## Mockups/Exemples
[Images ou exemples de code]

## Bénéfices
- Bénéfice 1
- Bénéfice 2

## Complexité Estimée
- [ ] Simple (quelques heures)
- [ ] Moyenne (quelques jours)
- [ ] Complexe (plusieurs semaines)
```

## 🎯 Priorités de Contribution

### 🔥 Haute Priorité
- Intégration de vrais modèles 3D (Instant-NGP, Nerfstudio)
- Tests unitaires et d'intégration
- Optimisation des performances
- Gestion d'erreurs robuste

### 🌟 Moyenne Priorité
- Amélioration UI/UX
- Support de formats 3D additionnels
- Fonctionnalités de partage
- Documentation vidéo

### 💫 Basse Priorité
- Thèmes personnalisables
- Traductions
- Easter eggs
- Animations avancées

## 🏆 Reconnaissance

Les contributeurs seront :
- Listés dans le README
- Mentionnés dans les release notes
- Crédités dans l'application (à venir)

## 📞 Questions ?

- Ouvrez une issue avec le label `question`
- Consultez la documentation existante
- Contactez les mainteneurs

## 📚 Ressources Utiles

- [Documentation Expo](https://docs.expo.dev/)
- [React Native Guide](https://reactnative.dev/docs/getting-started)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [PyTorch Tutorials](https://pytorch.org/tutorials/)

---

**Merci de contribuer à 3D-Plates ! 🎉**
