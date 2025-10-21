# 🏗️ Architecture du Projet 3D-Plates

## 📐 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION MOBILE                        │
│                      (Expo / React Native)                   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │  Camera  │  │  Import  │  │  Viewer  │   │
│  │  Screen  │→ │  Screen  │→ │  Screen  │→ │  Screen  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                       ↓                                      │
│                 ┌──────────┐                                │
│                 │Processing│                                │
│                 │  Screen  │                                │
│                 └──────────┘                                │
└─────────────────────┬────────────────────────────────────────┘
                      │ HTTP/REST API
                      │ (axios)
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    SERVEUR BACKEND                           │
│                    (Flask / Python)                          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API REST Endpoints                       │  │
│  │  • POST /api/reconstruct                             │  │
│  │  • GET  /api/status/{jobId}                          │  │
│  │  • GET  /api/model/{jobId}                           │  │
│  │  • GET  /api/health                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Traitement Vidéo (FFmpeg)                   │  │
│  │  • Extraction de frames                              │  │
│  │  • Optimisation qualité                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      Reconstruction 3D (PyTorch + CUDA)              │  │
│  │  • Instant-NGP / Nerfstudio / Gaussian Splatting    │  │
│  │  • Accélération GPU (RTX 4090)                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Génération Modèle 3D                        │  │
│  │  • Export OBJ/GLTF/PLY                               │  │
│  │  • Optimisation mesh                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📱 Frontend - Application Mobile

### Technologies
- **Framework** : Expo SDK 54 + React Native 0.81
- **Navigation** : React Navigation v7
- **État** : React Hooks (useState, useRef, useEffect)
- **HTTP** : Axios
- **3D Rendering** : Expo GL + Three.js

### Structure des Écrans

#### 1. HomeScreen.js
**Rôle** : Écran d'accueil avec choix de méthode
- Affichage des instructions
- Navigation vers Camera ou Import
- Design selon maquette fournie

#### 2. CameraScreen.js
**Rôle** : Capture vidéo en temps réel
- Gestion permissions caméra
- Enregistrement vidéo (15-60s)
- Timer et indicateurs visuels
- Sauvegarde locale temporaire

#### 3. ImportScreen.js
**Rôle** : Import vidéo depuis galerie
- Gestion permissions galerie
- Sélection fichier vidéo
- Validation durée minimum
- Vérification format

#### 4. ProcessingScreen.js
**Rôle** : Upload et suivi de traitement
- Upload vidéo vers serveur
- Polling statut reconstruction
- Barre de progression
- Gestion erreurs

#### 5. ViewerScreen.js
**Rôle** : Visualisation modèle 3D
- Chargement modèle 3D (OBJ/GLTF)
- Contrôles rotation/zoom
- Rendu WebGL via Three.js
- Actions (télécharger, partager)

### Flux de Données

```
User Action
    ↓
Component State (useState)
    ↓
API Call (axios)
    ↓
Server Response
    ↓
State Update
    ↓
UI Re-render
```

## 🖥️ Backend - Serveur

### Technologies
- **Framework** : Flask 3.0
- **ML/DL** : PyTorch 2.1 + CUDA 11.8
- **Traitement Vidéo** : FFmpeg
- **GPU** : NVIDIA RTX 4090

### Architecture API

```python
Flask App
├── Routes
│   ├── /api/health          → Health check + GPU info
│   ├── /api/reconstruct     → Upload + Start reconstruction
│   ├── /api/status/{id}     → Poll job status
│   └── /api/model/{id}      → Download 3D model
│
├── Services
│   ├── VideoProcessor       → Extract frames (FFmpeg)
│   ├── Reconstructor        → 3D reconstruction (PyTorch)
│   └── ModelExporter        → Export 3D formats
│
└── Storage
    ├── uploads/             → Uploaded videos
    └── outputs/             → Generated 3D models
```

### Pipeline de Reconstruction

```
1. Upload Vidéo
   ↓
2. Extraction Frames (FFmpeg)
   - 10 fps
   - Haute qualité
   - Format JPG
   ↓
3. Prétraitement
   - Détection objet
   - Segmentation
   - Calibration caméra
   ↓
4. Reconstruction 3D (GPU)
   - Neural Radiance Fields
   - ou Gaussian Splatting
   - ou Instant-NGP
   ↓
5. Post-traitement
   - Mesh generation
   - Texture mapping
   - Optimisation
   ↓
6. Export
   - OBJ (géométrie)
   - GLTF (scène complète)
   - PLY (point cloud)
```

## 🔄 Communication Client-Serveur

### Protocole

```
Mobile App                          Server
    │                                  │
    │  POST /api/reconstruct          │
    │  (multipart/form-data)          │
    ├─────────────────────────────────>│
    │                                  │ Process video
    │  Response: { jobId }             │ Extract frames
    │<─────────────────────────────────┤ Start reconstruction
    │                                  │
    │  GET /api/status/{jobId}        │
    ├─────────────────────────────────>│
    │  Response: { status, progress } │
    │<─────────────────────────────────┤
    │                                  │
    │  (Poll every 3s)                │
    │  ...                             │
    │                                  │
    │  GET /api/status/{jobId}        │
    ├─────────────────────────────────>│
    │  Response: { status: completed } │
    │<─────────────────────────────────┤
    │                                  │
    │  GET /api/model/{jobId}         │
    ├─────────────────────────────────>│
    │  Response: 3D model file        │
    │<─────────────────────────────────┤
    │                                  │
```

### Format des Données

#### Request: Upload Video
```http
POST /api/reconstruct
Content-Type: multipart/form-data

video: [binary data]
```

#### Response: Job Created
```json
{
  "jobId": "uuid-v4",
  "status": "processing",
  "modelUrl": "http://server/api/model/{jobId}"
}
```

#### Response: Job Status
```json
{
  "jobId": "uuid-v4",
  "status": "processing",
  "progress": 75
}
```

#### Response: Job Completed
```json
{
  "jobId": "uuid-v4",
  "status": "completed",
  "progress": 100,
  "modelUrl": "http://server/api/model/{jobId}"
}
```

## 🎨 Design Pattern

### Frontend

**Pattern** : Component-Based Architecture
- Composants fonctionnels React
- Hooks pour la gestion d'état
- Navigation stack-based
- Séparation présentation/logique

### Backend

**Pattern** : RESTful API + Job Queue
- Endpoints REST stateless
- Jobs asynchrones avec tracking
- Séparation concerns (routes/services/storage)
- Error handling centralisé

## 🔐 Sécurité

### Considérations Actuelles
- ⚠️ Pas d'authentification (MVP)
- ⚠️ Pas de rate limiting
- ⚠️ Pas de validation fichier avancée

### Recommandations Production
- ✅ Ajouter JWT authentication
- ✅ Implémenter rate limiting
- ✅ Valider et scanner fichiers uploadés
- ✅ HTTPS obligatoire
- ✅ CORS configuré strictement
- ✅ Sanitization des inputs

## 📊 Performance

### Optimisations Frontend
- Lazy loading des écrans
- Compression vidéo avant upload
- Cache des modèles 3D
- Debouncing des interactions

### Optimisations Backend
- Batch processing des frames
- GPU acceleration (CUDA)
- Async job processing
- CDN pour modèles 3D (production)

### Métriques Cibles
- Upload vidéo : < 30s (pour 100MB)
- Reconstruction : 2-5 min (selon complexité)
- Chargement modèle 3D : < 5s
- Rendu 3D : 60 FPS

## 🔧 Extensibilité

### Points d'Extension

1. **Modèles 3D**
   - Interface pour différents algorithmes
   - Plugins pour nouveaux formats
   - Configuration qualité/vitesse

2. **Stockage**
   - Support cloud (S3, Azure Blob)
   - Base de données pour métadonnées
   - Cache distribué (Redis)

3. **Processing**
   - Queue système (Celery, RQ)
   - Multi-GPU support
   - Distributed processing

4. **Features**
   - Authentification utilisateur
   - Galerie de modèles
   - Partage social
   - Export formats additionnels
   - AR preview

## 📦 Déploiement

### Développement
```
Mobile: Expo Go (development build)
Server: Flask dev server (localhost)
```

### Staging
```
Mobile: Expo EAS Build (internal distribution)
Server: Docker container + Gunicorn
```

### Production
```
Mobile: App Store / Google Play
Server: Kubernetes + Load Balancer
        + Redis + PostgreSQL
        + S3/CDN pour stockage
```

## 🧪 Tests (À Implémenter)

### Frontend
- Unit tests (Jest)
- Component tests (React Testing Library)
- E2E tests (Detox)

### Backend
- Unit tests (pytest)
- Integration tests (Flask test client)
- Load tests (Locust)

## 📈 Monitoring (À Implémenter)

### Métriques
- Temps de reconstruction
- Taux de succès/échec
- Utilisation GPU
- Latence réseau
- Erreurs par endpoint

### Outils Recommandés
- Sentry (error tracking)
- Prometheus + Grafana (metrics)
- ELK Stack (logs)

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2025-10-21
