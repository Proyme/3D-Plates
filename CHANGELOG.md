# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2025-10-21

### ✨ Ajouté
- **Application Mobile**
  - Écran d'accueil avec instructions détaillées
  - Capture vidéo en temps réel avec timer
  - Import de vidéos depuis la galerie
  - Visualisation 3D interactive avec Three.js
  - Navigation fluide entre les écrans
  - Gestion des permissions (caméra, galerie)
  - Indicateurs de progression pour le traitement
  - Support des vidéos de 15-60 secondes

- **Serveur Backend**
  - API REST avec Flask
  - Endpoint de reconstruction 3D
  - Extraction de frames avec FFmpeg
  - Support GPU (CUDA) pour RTX 4090
  - Système de jobs avec tracking
  - Health check endpoint
  - Gestion des uploads vidéo
  - Export de modèles 3D (OBJ)

- **Documentation**
  - README complet avec instructions
  - Guide d'utilisation détaillé
  - Guide de démarrage rapide
  - Documentation d'architecture
  - Guide de contribution
  - README serveur avec intégrations ML

- **Configuration**
  - Scripts de démarrage automatique (Windows)
  - Configuration Expo avec permissions
  - Fichiers de configuration exemple
  - Gitignore pour frontend et backend

### 🎨 Design
- Interface utilisateur moderne et épurée
- Design basé sur la maquette fournie
- Palette de couleurs cohérente (noir/blanc/gris)
- Icônes Ionicons pour cohérence visuelle
- Animations fluides entre les écrans
- Instructions visuelles claires

### 🔧 Technique
- Expo SDK 54
- React Native 0.81
- React Navigation v7
- Three.js pour rendu 3D
- Flask 3.0 pour le backend
- PyTorch 2.1 avec support CUDA
- FFmpeg pour traitement vidéo

### 📝 Notes
- Version initiale du projet
- Modèle 3D placeholder (cube) pour tests
- Prêt pour intégration de vrais modèles ML
- Optimisé pour RTX 4090

### 🚧 Limitations Connues
- Pas d'authentification utilisateur
- Modèle 3D placeholder (à remplacer)
- Pas de cache des modèles
- Pas de support multi-GPU
- Téléchargement/partage non implémentés

## [À Venir] - Roadmap

### Version 1.1.0 (Prévue)
- [ ] Intégration Instant-NGP pour vraie reconstruction 3D
- [ ] Support de Nerfstudio
- [ ] Cache des modèles 3D
- [ ] Compression vidéo avant upload
- [ ] Amélioration gestion d'erreurs

### Version 1.2.0 (Prévue)
- [ ] Authentification utilisateur (JWT)
- [ ] Galerie de modèles 3D
- [ ] Téléchargement de modèles
- [ ] Partage sur réseaux sociaux
- [ ] Support formats additionnels (GLTF, PLY)

### Version 2.0.0 (Future)
- [ ] Support AR (Réalité Augmentée)
- [ ] Édition de modèles 3D
- [ ] Marketplace de modèles
- [ ] Support multi-GPU
- [ ] Processing distribué
- [ ] Application web

---

## Types de Changements

- **Ajouté** : Nouvelles fonctionnalités
- **Modifié** : Changements dans les fonctionnalités existantes
- **Déprécié** : Fonctionnalités bientôt supprimées
- **Supprimé** : Fonctionnalités supprimées
- **Corrigé** : Corrections de bugs
- **Sécurité** : Corrections de vulnérabilités

## Format des Versions

- **MAJOR** : Changements incompatibles avec l'API
- **MINOR** : Ajout de fonctionnalités rétrocompatibles
- **PATCH** : Corrections de bugs rétrocompatibles

Exemple : `1.2.3` = MAJOR.MINOR.PATCH
