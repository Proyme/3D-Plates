# 3D-Plates 🎨

<div align="center">

**Application de Reconstruction 3D d'Objets par Intelligence Artificielle**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020.svg?style=flat&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?style=flat&logo=react)](https://reactnative.dev/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB.svg?style=flat&logo=python)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.1-EE4C2C.svg?style=flat&logo=pytorch)](https://pytorch.org/)

*Transformez vos vidéos d'objets en modèles 3D interactifs*

[🚀 Démarrage Rapide](#-installation) • [📖 Documentation](#-documentation) • [🎯 Fonctionnalités](#-fonctionnalités) • [🤝 Contribuer](#-contribution)

</div>

---

Application mobile développée avec Expo Go qui transforme des vidéos d'objets en modèles 3D grâce à l'intelligence artificielle.

## 📱 Fonctionnalités

- **Capture vidéo** : Filmez un objet à 360° directement depuis l'application
- **Import vidéo** : Importez une vidéo existante depuis votre galerie
- **Reconstruction 3D** : Transformation automatique en modèle 3D via serveur RTX 4090
- **Visualisation 3D** : Visualisez et manipulez le modèle 3D directement dans l'app
- **Interface intuitive** : Design moderne avec instructions claires

## 🎯 Instructions d'Utilisation

### Pour une reconstruction optimale :

1. **Objet isolé et centré**
   - Placez l'objet seul sur une surface neutre (blanc/gris)
   - Cadrez uniquement l'objet, pas le sol/table

2. **Tournez lentement**
   - Faites un tour complet à 360° en 15-30 secondes
   - Vous tournez autour, l'objet reste fixe

3. **Éclairage uniforme**
   - Évitez les ombres fortes et le contre-jour
   - Préférez une lumière naturelle ou diffuse

4. **Distance et stabilité**
   - Maintenez une distance de 30-50cm
   - Gardez le téléphone stable

## 🚀 Installation

### Prérequis
- Node.js 20+
- npm ou yarn
- Expo Go app sur votre téléphone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Python 3.8+ (pour le serveur)
- CUDA 11.8+ et RTX 4090 (pour le serveur)

### Installation de l'Application Mobile

```bash
# Cloner le repository
git clone <your-repo-url>
cd 3D-Plates

# Installer les dépendances
npm install

# Démarrer l'application
npx expo start
```

Scannez le QR code avec Expo Go pour lancer l'application sur votre téléphone.

### Installation du Serveur

Voir [server/README.md](server/README.md) pour les instructions détaillées.

```bash
cd server
pip install -r requirements.txt
python app.py
```

## ⚙️ Configuration

### 1. Configuration du Serveur

Dans `screens/ProcessingScreen.js`, modifiez l'URL du serveur :

```javascript
const SERVER_URL = 'http://YOUR_SERVER_IP:5000';
```

Remplacez `YOUR_SERVER_IP` par l'adresse IP de votre serveur.

### 2. Trouver l'adresse IP de votre serveur

**Windows :**
```bash
ipconfig
# Cherchez "Adresse IPv4"
```

**Linux/macOS :**
```bash
ifconfig
# ou
ip addr show
```

### 3. Tester la connexion

```bash
curl http://YOUR_SERVER_IP:5000/api/health
```

## 📁 Structure du Projet

```
3D-Plates/
├── screens/                  # Écrans de l'application
│   ├── HomeScreen.js        # Écran d'accueil
│   ├── CameraScreen.js      # Capture vidéo
│   ├── ImportScreen.js      # Import depuis galerie
│   ├── ProcessingScreen.js  # Traitement et upload
│   └── ViewerScreen.js      # Visualisation 3D
├── server/                   # Serveur backend
│   ├── app.py              # API Flask
│   ├── requirements.txt    # Dépendances Python
│   └── README.md           # Documentation serveur
├── App.js                   # Point d'entrée de l'app
├── app.json                # Configuration Expo
└── package.json            # Dépendances Node.js
```

## 🛠️ Technologies Utilisées

### Frontend (Mobile)
- **Expo** : Framework React Native
- **React Navigation** : Navigation entre écrans
- **Expo Camera** : Capture vidéo
- **Expo Image Picker** : Import de vidéos
- **Expo GL + Three.js** : Visualisation 3D
- **Axios** : Communication avec le serveur

### Backend (Serveur)
- **Flask** : API REST
- **PyTorch** : Framework ML (compatible CUDA)
- **FFmpeg** : Extraction de frames vidéo
- **CUDA** : Accélération GPU (RTX 4090)

### Modèles 3D Recommandés (à intégrer)
- **NVIDIA Instant-NGP** : Reconstruction rapide (recommandé pour RTX 4090)
- **Nerfstudio** : Pipeline NeRF complet
- **3D Gaussian Splatting** : Qualité supérieure

## 🔧 Développement

### Démarrer en mode développement

```bash
# Terminal 1 - Application mobile
npx expo start

# Terminal 2 - Serveur backend
cd server
python app.py
```

### Build pour production

```bash
# Android
eas build --platform android

# iOS (nécessite un Mac)
eas build --platform ios
```

## 🐛 Dépannage

### L'application ne se connecte pas au serveur
- Vérifiez que le serveur est démarré : `curl http://SERVER_IP:5000/api/health`
- Assurez-vous que le téléphone et le serveur sont sur le même réseau
- Vérifiez le pare-feu et ouvrez le port 5000
- Utilisez l'adresse IP locale, pas `localhost`

### La caméra ne fonctionne pas
- Vérifiez les permissions dans les paramètres de votre téléphone
- Redémarrez l'application Expo Go

### Erreur "CUDA not available" sur le serveur
- Vérifiez l'installation CUDA : `nvidia-smi`
- Réinstallez PyTorch avec CUDA : `pip install torch --index-url https://download.pytorch.org/whl/cu118`

### La reconstruction 3D échoue
- Vérifiez que FFmpeg est installé : `ffmpeg -version`
- Assurez-vous que la vidéo dure au moins 15 secondes
- Vérifiez les logs du serveur pour plus de détails

## 📝 TODO / Améliorations Futures

- [ ] Intégrer un vrai modèle de reconstruction 3D (Instant-NGP, Nerfstudio, etc.)
- [ ] Ajouter la gestion des jobs asynchrones avec Redis
- [ ] Implémenter le téléchargement et partage de modèles 3D
- [ ] Ajouter un système de cache pour les modèles
- [ ] Optimiser la compression vidéo avant upload
- [ ] Ajouter des filtres et post-processing sur les modèles
- [ ] Implémenter l'authentification utilisateur
- [ ] Créer une galerie de modèles 3D
- [ ] Ajouter le support AR (Réalité Augmentée)
- [ ] Exporter vers différents formats (OBJ, GLTF, PLY, etc.)

## 📚 Documentation

Ce projet dispose d'une documentation exhaustive :

### 🚀 Pour Commencer
- **[LISEZ-MOI-DABORD.txt](LISEZ-MOI-DABORD.txt)** - Premier fichier à lire
- **[DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md)** - Installation en 5 minutes
- **[CHECKLIST_INSTALLATION.md](CHECKLIST_INSTALLATION.md)** - Vérifier l'installation

### 📖 Guides Utilisateur
- **[GUIDE_UTILISATION.md](GUIDE_UTILISATION.md)** - Comment utiliser l'application
- **[FAQ.md](FAQ.md)** - Questions fréquentes (50+ Q&A)

### 💻 Documentation Technique
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture du projet
- **[server/README.md](server/README.md)** - Documentation serveur
- **[COMMANDES_UTILES.md](COMMANDES_UTILES.md)** - Référence des commandes

### 👨‍💻 Développement
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guide de contribution
- **[CHANGELOG.md](CHANGELOG.md)** - Historique des versions
- **[PROJET_COMPLET.md](PROJET_COMPLET.md)** - Récapitulatif complet

### 📋 Navigation
- **[INDEX_DOCUMENTATION.md](INDEX_DOCUMENTATION.md)** - Index complet de la documentation

## 📄 Licence

MIT License - Voir le fichier [LICENSE](LICENSE) pour plus de détails

## 👨‍💻 Auteur

Développeur indépendant

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

## 📞 Support

- **Documentation** : Consultez les 13 fichiers de documentation
- **FAQ** : Voir [FAQ.md](FAQ.md)
- **Issues** : Ouvrez une issue sur GitHub

## ⭐ Remerciements

Merci d'utiliser 3D-Plates ! Si ce projet vous est utile, n'hésitez pas à lui donner une étoile ⭐

---

<div align="center">

**Note Importante** ⚠️

Ce projet utilise actuellement un modèle 3D placeholder pour les tests.  
Pour une vraie reconstruction 3D, intégrez l'un des frameworks recommandés :
- NVIDIA Instant-NGP (recommandé pour RTX 4090)
- Nerfstudio
- 3D Gaussian Splatting

Consultez [server/README.md](server/README.md) pour les instructions d'intégration.

---

**Créé avec ❤️ par un développeur indépendant**

</div>
