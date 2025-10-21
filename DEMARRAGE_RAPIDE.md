# 🚀 Démarrage Rapide - 3D-Plates

Guide pour démarrer l'application en 5 minutes.

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir :

- [ ] **Node.js 20+** installé ([Télécharger](https://nodejs.org/))
- [ ] **Python 3.8+** installé ([Télécharger](https://www.python.org/))
- [ ] **Expo Go** sur votre téléphone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- [ ] **FFmpeg** installé (voir ci-dessous)
- [ ] **CUDA 11.8+** et **RTX 4090** (pour le serveur)

### Installation de FFmpeg (Windows)

```bash
# Avec Chocolatey (recommandé)
choco install ffmpeg

# Ou téléchargez depuis https://ffmpeg.org/
```

## 📱 Étape 1 : Démarrer l'Application Mobile

### Option A : Script automatique (Windows)

Double-cliquez sur `start.bat`

### Option B : Ligne de commande

```bash
# Dans le dossier 3D-Plates
npm install
npx expo start
```

**Résultat** : Un QR code s'affiche dans le terminal

## 📱 Étape 2 : Ouvrir sur votre Téléphone

1. Ouvrez **Expo Go** sur votre téléphone
2. Scannez le QR code affiché
3. L'application se charge automatiquement

**Important** : Votre téléphone et votre ordinateur doivent être sur le même réseau Wi-Fi.

## 🖥️ Étape 3 : Démarrer le Serveur

### Option A : Script automatique (Windows)

```bash
cd server
# Double-cliquez sur start_server.bat
```

### Option B : Ligne de commande

```bash
cd server

# Créer un environnement virtuel (première fois seulement)
python -m venv venv

# Activer l'environnement
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Installer les dépendances (première fois seulement)
pip install -r requirements.txt

# Installer PyTorch avec CUDA pour RTX 4090
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118

# Démarrer le serveur
python app.py
```

**Résultat** : Le serveur démarre sur `http://0.0.0.0:5000`

## ⚙️ Étape 4 : Configuration

### 4.1 Trouver l'adresse IP de votre serveur

**Windows :**
```bash
ipconfig
```
Cherchez "Adresse IPv4" (exemple : `192.168.1.100`)

**Linux/Mac :**
```bash
ifconfig
# ou
ip addr show
```

### 4.2 Configurer l'application

Ouvrez `screens/ProcessingScreen.js` et modifiez la ligne 11 :

```javascript
// Remplacez YOUR_SERVER_IP par votre adresse IP
const SERVER_URL = 'http://192.168.1.100:5000';
```

### 4.3 Tester la connexion

```bash
# Remplacez 192.168.1.100 par votre IP
curl http://192.168.1.100:5000/api/health
```

**Réponse attendue :**
```json
{
  "status": "healthy",
  "gpu_available": true,
  "gpu_name": "NVIDIA GeForce RTX 4090",
  "timestamp": "2025-10-21T18:00:00"
}
```

## 🎬 Étape 5 : Premier Test

1. **Sur l'application mobile** :
   - Appuyez sur "Filmer un objet"
   - Autorisez l'accès à la caméra
   - Filmez un objet pendant 15-30 secondes en tournant autour
   - Arrêtez l'enregistrement

2. **Traitement** :
   - La vidéo est envoyée au serveur
   - La reconstruction 3D démarre (2-5 minutes)
   - Le modèle 3D s'affiche automatiquement

3. **Visualisation** :
   - Glissez votre doigt pour faire tourner le modèle
   - Explorez votre objet en 3D !

## 🔧 Dépannage Rapide

### Problème : "Cannot connect to server"

**Solutions :**
1. Vérifiez que le serveur est démarré
2. Vérifiez l'adresse IP dans `ProcessingScreen.js`
3. Assurez-vous d'être sur le même réseau Wi-Fi
4. Désactivez temporairement le pare-feu Windows

### Problème : "CUDA not available"

**Solutions :**
1. Vérifiez l'installation CUDA : `nvidia-smi`
2. Réinstallez PyTorch avec CUDA :
   ```bash
   pip uninstall torch torchvision
   pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
   ```

### Problème : "FFmpeg not found"

**Solutions :**
1. Installez FFmpeg : `choco install ffmpeg`
2. Vérifiez l'installation : `ffmpeg -version`
3. Redémarrez le terminal

### Problème : Le QR code ne s'affiche pas

**Solutions :**
1. Vérifiez que le port 8081 n'est pas utilisé
2. Essayez : `npx expo start --tunnel`
3. Redémarrez le terminal

## 📊 Vérification de l'Installation

Utilisez cette checklist pour vérifier que tout fonctionne :

```bash
# Vérifier Node.js
node --version
# Doit afficher v20.x.x ou supérieur

# Vérifier npm
npm --version

# Vérifier Python
python --version
# Doit afficher 3.8 ou supérieur

# Vérifier FFmpeg
ffmpeg -version

# Vérifier CUDA
nvidia-smi

# Vérifier PyTorch et CUDA
python -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA: {torch.cuda.is_available()}')"

# Tester le serveur
curl http://localhost:5000/api/health
```

## 🎯 Prochaines Étapes

Une fois que tout fonctionne :

1. Lisez le [Guide d'Utilisation](GUIDE_UTILISATION.md) pour optimiser vos scans
2. Consultez le [README](README.md) pour les fonctionnalités avancées
3. Explorez le [README du serveur](server/README.md) pour intégrer un vrai modèle 3D

## 💡 Conseils

- **Première utilisation** : Testez avec un objet simple (tasse, figurine)
- **Éclairage** : Utilisez la lumière naturelle d'une fenêtre
- **Durée** : Filmez 20-30 secondes pour de meilleurs résultats
- **Mouvement** : Tournez lentement et régulièrement autour de l'objet

## 📞 Besoin d'Aide ?

- Consultez la section [Dépannage](README.md#-dépannage) du README
- Vérifiez les logs du serveur pour plus de détails
- Ouvrez une issue sur GitHub

---

**Vous êtes prêt ! Bon scan 3D ! 🎉**

## 🔗 Liens Utiles

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation Flask](https://flask.palletsprojects.com/)
- [Documentation PyTorch](https://pytorch.org/docs/)
- [NVIDIA Instant-NGP](https://github.com/NVlabs/instant-ngp)
- [Nerfstudio](https://docs.nerf.studio/)
