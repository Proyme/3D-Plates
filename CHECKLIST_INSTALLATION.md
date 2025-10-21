# ✅ Checklist d'Installation - 3D-Plates

Utilisez cette checklist pour vérifier que votre installation est complète et fonctionnelle.

## 📋 Prérequis

### Logiciels Requis

- [ ] **Node.js 20+** installé
  ```bash
  node --version
  # Doit afficher v20.x.x ou supérieur
  ```

- [ ] **npm** installé
  ```bash
  npm --version
  # Doit afficher 10.x.x ou supérieur
  ```

- [ ] **Python 3.8+** installé
  ```bash
  python --version
  # Doit afficher 3.8 ou supérieur
  ```

- [ ] **pip** installé
  ```bash
  pip --version
  ```

- [ ] **FFmpeg** installé
  ```bash
  ffmpeg -version
  ```

- [ ] **CUDA 11.8+** installé (pour GPU)
  ```bash
  nvidia-smi
  # Doit afficher les infos de votre GPU
  ```

- [ ] **Expo Go** installé sur votre téléphone
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 📱 Installation Application Mobile

### Étape 1: Dépendances

- [ ] Dossier `node_modules/` créé
  ```bash
  cd d:/3D-Plates
  npm install
  ```

- [ ] Pas d'erreurs d'installation
- [ ] Toutes les dépendances installées (vérifier package.json)

### Étape 2: Configuration

- [ ] Fichier `app.json` contient les permissions caméra
- [ ] Fichier `App.js` existe et est correct
- [ ] Dossier `screens/` contient 5 fichiers:
  - [ ] HomeScreen.js
  - [ ] CameraScreen.js
  - [ ] ImportScreen.js
  - [ ] ProcessingScreen.js
  - [ ] ViewerScreen.js

### Étape 3: Test de Démarrage

- [ ] L'application démarre sans erreur
  ```bash
  npx expo start
  ```

- [ ] QR code s'affiche dans le terminal
- [ ] Pas d'erreurs dans la console
- [ ] Metro bundler fonctionne

### Étape 4: Test sur Téléphone

- [ ] QR code scanné avec Expo Go
- [ ] Application se charge sur le téléphone
- [ ] Écran d'accueil s'affiche correctement
- [ ] Navigation fonctionne (test des boutons)

## 🖥️ Installation Serveur

### Étape 1: Environnement Virtuel

- [ ] Environnement virtuel créé
  ```bash
  cd d:/3D-Plates/server
  python -m venv venv
  ```

- [ ] Environnement activé
  ```bash
  # Windows:
  venv\Scripts\activate
  # Linux/Mac:
  source venv/bin/activate
  ```

- [ ] Prompt indique `(venv)`

### Étape 2: Dépendances Python

- [ ] Dépendances installées
  ```bash
  pip install -r requirements.txt
  ```

- [ ] PyTorch avec CUDA installé
  ```bash
  pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
  ```

- [ ] Vérification PyTorch + CUDA
  ```bash
  python -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA: {torch.cuda.is_available()}')"
  # Doit afficher True pour CUDA
  ```

### Étape 3: Structure Serveur

- [ ] Fichier `app.py` existe
- [ ] Dossiers créés automatiquement au démarrage:
  - [ ] `uploads/`
  - [ ] `outputs/`

### Étape 4: Test Serveur

- [ ] Serveur démarre sans erreur
  ```bash
  python app.py
  ```

- [ ] Message "Running on http://0.0.0.0:5000" s'affiche
- [ ] GPU détecté (si disponible)
- [ ] Pas d'erreurs dans la console

### Étape 5: Test API

- [ ] Health check fonctionne
  ```bash
  curl http://localhost:5000/api/health
  ```

- [ ] Réponse JSON reçue
- [ ] Status "healthy"
- [ ] GPU info correcte

## 🔧 Configuration

### Étape 1: Trouver l'Adresse IP

- [ ] Adresse IP du serveur trouvée
  ```bash
  # Windows:
  ipconfig
  # Linux/Mac:
  ifconfig
  ```

- [ ] IP notée (exemple: 192.168.1.100)

### Étape 2: Configurer l'Application

- [ ] Fichier `screens/ProcessingScreen.js` ouvert
- [ ] Ligne 21 modifiée avec votre IP:
  ```javascript
  const SERVER_URL = 'http://192.168.1.100:5000';
  ```

- [ ] Fichier sauvegardé
- [ ] Application redémarrée

### Étape 3: Test de Connexion

- [ ] Téléphone et serveur sur même réseau Wi-Fi
- [ ] Test connexion depuis téléphone:
  ```bash
  curl http://192.168.1.100:5000/api/health
  ```

- [ ] Réponse reçue
- [ ] Pas d'erreur de connexion

## 🧪 Tests Fonctionnels

### Test 1: Capture Vidéo

- [ ] Bouton "Filmer un objet" fonctionne
- [ ] Permission caméra accordée
- [ ] Caméra s'ouvre correctement
- [ ] Enregistrement démarre (bouton rouge)
- [ ] Timer s'affiche
- [ ] Enregistrement s'arrête (bouton carré)
- [ ] Navigation vers écran de traitement

### Test 2: Import Vidéo

- [ ] Bouton "Importer une vidéo" fonctionne
- [ ] Permission galerie accordée
- [ ] Galerie s'ouvre
- [ ] Vidéo sélectionnable
- [ ] Navigation vers écran de traitement

### Test 3: Traitement

- [ ] Écran de traitement s'affiche
- [ ] Message "Envoi de la vidéo..." apparaît
- [ ] Barre de progression fonctionne
- [ ] Pas d'erreur de connexion
- [ ] Traitement se termine
- [ ] Navigation vers visualisation 3D

### Test 4: Visualisation 3D

- [ ] Modèle 3D s'affiche
- [ ] Rotation fonctionne (glisser doigt)
- [ ] Bouton retour fonctionne
- [ ] Bouton reset fonctionne
- [ ] Pas de lag ou freeze

## 🔍 Vérifications Finales

### Documentation

- [ ] Tous les fichiers .md sont présents:
  - [ ] README.md
  - [ ] DEMARRAGE_RAPIDE.md
  - [ ] GUIDE_UTILISATION.md
  - [ ] ARCHITECTURE.md
  - [ ] CONTRIBUTING.md
  - [ ] FAQ.md
  - [ ] CHANGELOG.md
  - [ ] COMMANDES_UTILES.md
  - [ ] PROJET_COMPLET.md
  - [ ] CHECKLIST_INSTALLATION.md (ce fichier)

- [ ] Fichier LISEZ-MOI-DABORD.txt présent
- [ ] server/README.md présent

### Scripts

- [ ] start.bat fonctionne (Windows)
- [ ] server/start_server.bat fonctionne (Windows)

### Configuration

- [ ] app.json correct
- [ ] package.json correct
- [ ] server/requirements.txt correct
- [ ] .gitignore présents (root et server/)

## 🎯 Test Complet End-to-End

### Scénario: Scanner un Objet

1. **Préparation**
   - [ ] Objet simple choisi (tasse, figurine)
   - [ ] Surface neutre préparée
   - [ ] Bon éclairage

2. **Capture**
   - [ ] Application ouverte
   - [ ] "Filmer un objet" sélectionné
   - [ ] Vidéo de 20 secondes enregistrée
   - [ ] Tour complet à 360° effectué

3. **Traitement**
   - [ ] Upload réussi
   - [ ] Progression affichée
   - [ ] Traitement terminé sans erreur
   - [ ] Temps < 5 minutes

4. **Visualisation**
   - [ ] Modèle 3D affiché
   - [ ] Rotation fluide
   - [ ] Pas de crash

5. **Retour**
   - [ ] Retour à l'accueil fonctionne
   - [ ] Nouveau scan possible

## ⚠️ Problèmes Courants

Si vous rencontrez des problèmes, consultez cette section:

### ❌ "Cannot connect to server"

**Vérifications:**
- [ ] Serveur est démarré
- [ ] IP correcte dans ProcessingScreen.js
- [ ] Même réseau Wi-Fi
- [ ] Pare-feu autorise port 5000
- [ ] Test: `curl http://IP:5000/api/health`

**Solution:**
```bash
# Vérifier le serveur
curl http://localhost:5000/api/health

# Vérifier depuis le réseau
curl http://192.168.1.100:5000/api/health

# Ouvrir le port (Windows)
netsh advfirewall firewall add rule name="Flask" dir=in action=allow protocol=TCP localport=5000
```

### ❌ "CUDA not available"

**Vérifications:**
- [ ] nvidia-smi fonctionne
- [ ] CUDA installé
- [ ] PyTorch avec CUDA installé

**Solution:**
```bash
# Vérifier GPU
nvidia-smi

# Réinstaller PyTorch avec CUDA
pip uninstall torch torchvision
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118

# Vérifier
python -c "import torch; print(torch.cuda.is_available())"
```

### ❌ "FFmpeg not found"

**Solution:**
```bash
# Windows
choco install ffmpeg

# Vérifier
ffmpeg -version
```

### ❌ Application crash

**Solution:**
```bash
# Nettoyer le cache
npx expo start --clear

# Réinstaller
rm -rf node_modules
npm install
```

## 📊 Résumé

### ✅ Installation Réussie Si:

- [ ] Application mobile démarre
- [ ] Serveur démarre
- [ ] Connexion app ↔ serveur fonctionne
- [ ] Capture vidéo fonctionne
- [ ] Import vidéo fonctionne
- [ ] Traitement fonctionne
- [ ] Visualisation 3D fonctionne
- [ ] Pas d'erreurs critiques

### 🎉 Félicitations !

Si tous les points sont cochés, votre installation est complète et fonctionnelle !

**Prochaines étapes:**
1. Lisez le [Guide d'Utilisation](GUIDE_UTILISATION.md)
2. Testez avec différents objets
3. Consultez [server/README.md](server/README.md) pour intégrer un vrai modèle ML
4. Explorez les fonctionnalités avancées

## 📞 Besoin d'Aide ?

- **Documentation**: Consultez les fichiers .md
- **FAQ**: Voir [FAQ.md](FAQ.md)
- **Dépannage**: Voir [README.md](README.md#-dépannage)
- **Issues**: Ouvrez une issue sur GitHub

---

**Date de création**: 2025-10-21  
**Version**: 1.0.0  
**Status**: ✅ Prêt pour utilisation
