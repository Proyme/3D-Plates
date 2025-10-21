# Serveur de Reconstruction 3D

Ce serveur backend gère la reconstruction 3D d'objets à partir de vidéos, optimisé pour RTX 4090.

## Installation

### Prérequis
- Python 3.8+
- CUDA 11.8+ (pour RTX 4090)
- FFmpeg

### Installation de FFmpeg
```bash
# Windows (avec Chocolatey)
choco install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg
```

### Installation des dépendances Python
```bash
cd server
pip install -r requirements.txt
```

### Installation de PyTorch avec CUDA (pour RTX 4090)
```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

## Configuration

1. Modifiez `SERVER_URL` dans `screens/ProcessingScreen.js` avec l'adresse IP de votre serveur :
   ```javascript
   const SERVER_URL = 'http://YOUR_SERVER_IP:5000';
   ```

2. Si vous utilisez un serveur distant, assurez-vous que le port 5000 est ouvert.

## Démarrage du serveur

```bash
cd server
python app.py
```

Le serveur démarre sur `http://0.0.0.0:5000`

## API Endpoints

### Health Check
```
GET /api/health
```
Vérifie l'état du serveur et la disponibilité du GPU.

### Reconstruction 3D
```
POST /api/reconstruct
Content-Type: multipart/form-data

Body:
- video: fichier vidéo (mp4, mov, avi, mkv)
```

Retourne:
```json
{
  "jobId": "uuid",
  "status": "completed",
  "modelUrl": "http://server/api/model/uuid"
}
```

### Statut du Job
```
GET /api/status/{jobId}
```

### Téléchargement du Modèle
```
GET /api/model/{jobId}
```

## Intégration de Modèles 3D Avancés

Le serveur actuel crée un modèle placeholder. Pour une vraie reconstruction 3D, intégrez l'un de ces frameworks :

### 1. NVIDIA Instant-NGP (Recommandé pour RTX 4090)
```bash
git clone --recursive https://github.com/NVlabs/instant-ngp
cd instant-ngp
cmake . -B build
cmake --build build --config RelWithDebInfo -j
```

Décommentez la fonction `run_instant_ngp()` dans `app.py` et adaptez-la.

### 2. Nerfstudio
```bash
pip install nerfstudio
```

Décommentez la fonction `run_nerfstudio()` dans `app.py` et adaptez-la.

### 3. 3D Gaussian Splatting
```bash
git clone https://github.com/graphdeco-inria/gaussian-splatting
cd gaussian-splatting
pip install -r requirements.txt
```

Décommentez la fonction `run_gaussian_splatting()` dans `app.py` et adaptez-la.

## Optimisation pour RTX 4090

- Le serveur détecte automatiquement le GPU
- Utilisez CUDA 11.8+ pour de meilleures performances
- Ajustez `batch_size` selon votre VRAM (24GB sur RTX 4090)
- Activez TensorFloat-32 pour accélérer les calculs :
  ```python
  torch.backends.cuda.matmul.allow_tf32 = True
  torch.backends.cudnn.allow_tf32 = True
  ```

## Structure des Dossiers

```
server/
├── app.py              # Serveur Flask principal
├── requirements.txt    # Dépendances Python
├── uploads/           # Vidéos uploadées (créé automatiquement)
└── outputs/           # Modèles 3D générés (créé automatiquement)
```

## Dépannage

### Erreur "CUDA not available"
- Vérifiez l'installation de CUDA : `nvidia-smi`
- Réinstallez PyTorch avec CUDA : `pip install torch --index-url https://download.pytorch.org/whl/cu118`

### Erreur "FFmpeg not found"
- Installez FFmpeg (voir section Installation)
- Vérifiez : `ffmpeg -version`

### Erreur de connexion depuis l'app mobile
- Vérifiez que le serveur est accessible : `curl http://SERVER_IP:5000/api/health`
- Désactivez le pare-feu ou ouvrez le port 5000
- Utilisez l'adresse IP locale du serveur, pas `localhost`

## Production

Pour la production, utilisez :
- Gunicorn ou uWSGI au lieu du serveur Flask de développement
- NGINX comme reverse proxy
- Redis pour la gestion des jobs asynchrones
- Docker pour le déploiement

Exemple avec Gunicorn :
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
