# 🛠️ Commandes Utiles - 3D-Plates

Guide de référence rapide des commandes les plus utilisées.

## 📱 Application Mobile (Expo)

### Démarrage

```bash
# Démarrer l'application
npm start
# ou
npx expo start

# Démarrer avec cache vidé
npx expo start --clear

# Démarrer en mode tunnel (pour réseau complexe)
npx expo start --tunnel

# Démarrer directement sur Android
npx expo start --android

# Démarrer directement sur iOS
npx expo start --ios
```

### Installation

```bash
# Installer toutes les dépendances
npm install

# Installer une dépendance spécifique
npm install <package-name>

# Mettre à jour Expo
npm install expo@latest

# Vérifier les dépendances obsolètes
npm outdated
```

### Nettoyage

```bash
# Nettoyer le cache
npx expo start --clear

# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install

# Nettoyer complètement (Windows)
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Build Production

```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter à Expo
eas login

# Configurer le build
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios

# Build les deux
eas build --platform all
```

### Debugging

```bash
# Afficher les logs
npx expo start

# Logs détaillés
npx expo start --verbose

# Ouvrir DevTools
# Appuyez sur 'd' dans le terminal après le démarrage
```

## 🖥️ Serveur Backend (Python/Flask)

### Environnement Virtuel

```bash
# Créer un environnement virtuel
python -m venv venv

# Activer (Windows)
venv\Scripts\activate

# Activer (Linux/Mac)
source venv/bin/activate

# Désactiver
deactivate
```

### Installation

```bash
# Installer les dépendances
pip install -r requirements.txt

# Installer PyTorch avec CUDA (RTX 4090)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118

# Installer une dépendance spécifique
pip install <package-name>

# Mettre à jour pip
python -m pip install --upgrade pip

# Lister les packages installés
pip list

# Générer requirements.txt
pip freeze > requirements.txt
```

### Démarrage

```bash
# Démarrer le serveur (développement)
python app.py

# Démarrer avec Gunicorn (production)
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# Démarrer avec logs détaillés
python app.py --debug

# Démarrer sur un port différent
python app.py --port 8000
```

### Tests

```bash
# Tester le serveur
curl http://localhost:5000/api/health

# Tester avec une IP spécifique
curl http://192.168.1.100:5000/api/health

# Upload de test (avec curl)
curl -X POST -F "video=@test.mp4" http://localhost:5000/api/reconstruct

# Vérifier le statut d'un job
curl http://localhost:5000/api/status/{jobId}
```

### Monitoring

```bash
# Voir l'utilisation GPU
nvidia-smi

# Monitoring GPU en temps réel
watch -n 1 nvidia-smi

# Logs du serveur
tail -f server.log

# Processus Python actifs
ps aux | grep python
```

## 🔧 Outils Système

### FFmpeg

```bash
# Vérifier l'installation
ffmpeg -version

# Extraire des frames d'une vidéo
ffmpeg -i input.mp4 -vf fps=10 output_%04d.jpg

# Convertir une vidéo
ffmpeg -i input.mov -c:v libx264 output.mp4

# Réduire la taille d'une vidéo
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 output.mp4

# Obtenir des infos sur une vidéo
ffmpeg -i video.mp4
```

### Git

```bash
# Cloner le repository
git clone <url>

# Créer une branche
git checkout -b feature/ma-fonctionnalite

# Voir les changements
git status
git diff

# Commit
git add .
git commit -m "feat: ajout de fonctionnalité"

# Push
git push origin feature/ma-fonctionnalite

# Pull dernières modifications
git pull origin main

# Voir l'historique
git log --oneline
```

### Réseau

```bash
# Trouver votre IP (Windows)
ipconfig

# Trouver votre IP (Linux/Mac)
ifconfig
# ou
ip addr show

# Tester la connexion
ping 192.168.1.100

# Voir les ports ouverts (Windows)
netstat -an | findstr :5000

# Voir les ports ouverts (Linux/Mac)
lsof -i :5000
```

## 🐛 Debugging

### Vérification Environnement

```bash
# Vérifier Node.js
node --version

# Vérifier npm
npm --version

# Vérifier Python
python --version

# Vérifier pip
pip --version

# Vérifier CUDA
nvidia-smi

# Vérifier PyTorch et CUDA
python -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA: {torch.cuda.is_available()}')"

# Vérifier FFmpeg
ffmpeg -version

# Vérifier Expo CLI
npx expo --version
```

### Nettoyage Complet

```bash
# Frontend
rm -rf node_modules package-lock.json
npm install
npx expo start --clear

# Backend
rm -rf venv
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
pip install -r requirements.txt

# Supprimer les fichiers temporaires
rm -rf uploads/* outputs/*
```

### Logs et Diagnostics

```bash
# Logs Expo
npx expo start --verbose

# Logs serveur Flask
python app.py > server.log 2>&1

# Logs GPU
nvidia-smi --query-gpu=timestamp,name,temperature.gpu,utilization.gpu,memory.used --format=csv -l 1

# Espace disque
df -h  # Linux/Mac
dir    # Windows

# Mémoire RAM
free -h  # Linux
top      # Mac
tasklist # Windows
```

## 📊 Performance

### Benchmarking

```bash
# Tester la vitesse d'upload
curl -X POST -F "video=@test.mp4" -w "@curl-format.txt" http://localhost:5000/api/reconstruct

# Mesurer le temps d'exécution
time python app.py

# Profiling Python
python -m cProfile app.py

# Monitoring réseau
iftop  # Linux
```

### Optimisation

```bash
# Compiler Python en bytecode
python -m compileall .

# Optimiser les images
# (si vous ajoutez des assets)
npx expo-optimize

# Analyser la taille du bundle
npx expo export --dump-sourcemap
```

## 🔒 Sécurité

### Permissions

```bash
# Vérifier les permissions (Linux/Mac)
ls -la

# Changer les permissions
chmod +x start.sh

# Vérifier les ports ouverts
sudo netstat -tulpn | grep LISTEN
```

### Firewall

```bash
# Ouvrir le port 5000 (Windows Firewall)
netsh advfirewall firewall add rule name="Flask Server" dir=in action=allow protocol=TCP localport=5000

# Ouvrir le port 5000 (Linux UFW)
sudo ufw allow 5000

# Vérifier le firewall (Windows)
netsh advfirewall show allprofiles
```

## 📦 Déploiement

### Docker (À venir)

```bash
# Build l'image
docker build -t 3d-plates-server .

# Lancer le container
docker run -p 5000:5000 3d-plates-server

# Voir les containers actifs
docker ps

# Logs du container
docker logs <container-id>
```

### Production

```bash
# Installer Gunicorn
pip install gunicorn

# Démarrer avec Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 --timeout 300 app:app

# Avec supervisor (Linux)
sudo supervisorctl start 3d-plates

# Vérifier le statut
sudo supervisorctl status
```

## 🧪 Tests (À implémenter)

```bash
# Frontend tests
npm test

# Backend tests
pytest

# Coverage
pytest --cov=app tests/

# Linting
eslint .
flake8 .
```

## 📚 Documentation

```bash
# Générer la documentation (si configuré)
npm run docs

# Servir la documentation localement
python -m http.server 8000
```

## 🔄 Mise à Jour

```bash
# Mettre à jour toutes les dépendances (Frontend)
npm update

# Mettre à jour toutes les dépendances (Backend)
pip install --upgrade -r requirements.txt

# Vérifier les vulnérabilités
npm audit
pip check
```

## 💡 Raccourcis Utiles

### Expo DevTools

- `a` : Ouvrir sur Android
- `i` : Ouvrir sur iOS
- `w` : Ouvrir sur web
- `d` : Ouvrir DevTools
- `r` : Recharger l'app
- `m` : Basculer menu
- `c` : Vider le cache

### Terminal

```bash
# Historique des commandes
history

# Rechercher dans l'historique
Ctrl + R

# Annuler une commande
Ctrl + C

# Effacer le terminal
clear  # Linux/Mac
cls    # Windows
```

---

## 📝 Notes

- Remplacez `<package-name>`, `{jobId}`, etc. par les valeurs réelles
- Sur Windows, utilisez `\` au lieu de `/` pour les chemins
- Certaines commandes nécessitent des privilèges admin/sudo
- Adaptez les commandes selon votre système d'exploitation

**Dernière mise à jour** : 2025-10-21
