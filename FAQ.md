# ❓ FAQ - Questions Fréquentes

## 📱 Application Mobile

### Q: Sur quels appareils l'application fonctionne-t-elle ?
**R:** L'application fonctionne sur :
- **iOS** : iPhone 11 et plus récent (iOS 13+)
- **Android** : Android 8.0 (Oreo) et plus récent
- Nécessite Expo Go pour le développement

### Q: Pourquoi utiliser Expo Go au lieu d'une app native ?
**R:** Expo Go permet :
- Développement et tests rapides
- Pas besoin de compiler l'app
- Mises à jour instantanées
- Pour la production, on peut compiler une app standalone

### Q: L'application fonctionne-t-elle hors ligne ?
**R:** Non, une connexion internet est nécessaire pour :
- Envoyer la vidéo au serveur
- Recevoir le modèle 3D
- La capture vidéo fonctionne hors ligne

### Q: Quelle est la taille maximale de vidéo ?
**R:** 
- **Maximum** : 500 MB
- **Recommandé** : 50-100 MB (15-30 secondes en 1080p)
- Des vidéos plus courtes = traitement plus rapide

### Q: Puis-je utiliser des vidéos existantes ?
**R:** Oui ! Utilisez l'option "Importer une vidéo" pour sélectionner une vidéo depuis votre galerie.

### Q: Les vidéos sont-elles stockées ?
**R:** 
- Sur le téléphone : temporairement pendant l'upload
- Sur le serveur : oui, dans le dossier `uploads/`
- Supprimez-les manuellement si nécessaire

## 🎥 Capture Vidéo

### Q: Quelle durée de vidéo est idéale ?
**R:** 
- **Minimum** : 15 secondes
- **Optimal** : 20-30 secondes
- **Maximum** : 60 secondes
- Plus long ≠ meilleur. La qualité du mouvement compte plus.

### Q: Dois-je faire un tour complet à 360° ?
**R:** Oui, absolument ! Un tour complet permet de capturer tous les angles de l'objet pour une reconstruction précise.

### Q: Puis-je bouger l'objet au lieu de tourner autour ?
**R:** Non, il est préférable de :
- Garder l'objet fixe
- Tourner vous-même autour
- Cela évite les flous et améliore la qualité

### Q: Quelle distance maintenir avec l'objet ?
**R:** 
- **Idéal** : 30-50 cm
- L'objet doit occuper 60-80% de l'écran
- Maintenez une distance constante pendant la capture

### Q: Quel éclairage utiliser ?
**R:** 
- **Meilleur** : Lumière naturelle diffuse (fenêtre sans soleil direct)
- **Bon** : Plusieurs sources de lumière artificielle
- **À éviter** : Flash, contre-jour, ombres fortes

## 🖥️ Serveur

### Q: Ai-je besoin d'une RTX 4090 ?
**R:** 
- **Recommandé** : RTX 4090 pour performances optimales
- **Possible** : Autres GPU NVIDIA avec CUDA
- **Lent** : CPU uniquement (10x plus lent)

### Q: Le serveur peut-il tourner sur le même ordinateur que l'app ?
**R:** Oui ! C'est même la configuration la plus simple pour le développement.

### Q: Puis-je utiliser un serveur cloud ?
**R:** Oui, vous pouvez déployer sur :
- AWS EC2 (instances GPU)
- Google Cloud (Compute Engine avec GPU)
- Azure (VM avec GPU)
- Assurez-vous d'avoir CUDA installé

### Q: Combien de temps prend la reconstruction ?
**R:** 
- **Avec placeholder actuel** : 10-30 secondes
- **Avec vrai modèle ML** : 2-10 minutes selon :
  - Complexité de l'objet
  - Durée de la vidéo
  - Puissance du GPU

### Q: Puis-je traiter plusieurs vidéos en même temps ?
**R:** 
- **Actuellement** : Non, traitement séquentiel
- **À venir** : Queue système avec Redis/Celery
- Limitez à 1 reconstruction à la fois pour éviter les problèmes

### Q: Le serveur consomme-t-il beaucoup de ressources ?
**R:** 
- **CPU** : Modéré (extraction frames)
- **GPU** : Élevé pendant reconstruction
- **RAM** : 8-16 GB recommandé
- **Stockage** : ~1 GB par vidéo (temporaire)

## 🎨 Modèles 3D

### Q: Quel format de modèle 3D est généré ?
**R:** 
- **Actuellement** : OBJ (géométrie uniquement)
- **À venir** : GLTF, PLY, FBX
- OBJ est compatible avec la plupart des logiciels 3D

### Q: Le modèle a-t-il des textures ?
**R:** 
- **Placeholder actuel** : Non, couleur unie
- **Avec vrai modèle** : Oui, textures photorealistic

### Q: Puis-je éditer le modèle 3D ?
**R:** 
- Dans l'app : Non (visualisation uniquement)
- Téléchargez-le et utilisez :
  - Blender (gratuit)
  - Maya, 3ds Max (professionnel)
  - MeshLab (gratuit, analyse)

### Q: La qualité du modèle est mauvaise, pourquoi ?
**R:** Causes possibles :
- Vidéo trop rapide → Filmez plus lentement
- Éclairage insuffisant → Ajoutez de la lumière
- Objet trop petit → Rapprochez-vous
- Tour incomplet → Faites 360° complet
- **Note** : Le placeholder actuel est un simple cube

### Q: Puis-je scanner des personnes ?
**R:** 
- **Techniquement** : Oui
- **Difficulté** : Très difficile (mouvement)
- **Recommandé** : Objets statiques uniquement
- Pour les personnes, utilisez des scanners dédiés

## 🔧 Problèmes Techniques

### Q: "Cannot connect to server" - Que faire ?
**R:** Vérifiez :
1. Le serveur est démarré : `curl http://SERVER_IP:5000/api/health`
2. L'IP est correcte dans `ProcessingScreen.js`
3. Téléphone et serveur sur même réseau Wi-Fi
4. Pare-feu autorise le port 5000
5. Utilisez l'IP locale, pas `localhost`

### Q: "CUDA not available" sur le serveur
**R:** 
1. Vérifiez CUDA : `nvidia-smi`
2. Réinstallez PyTorch avec CUDA :
   ```bash
   pip install torch --index-url https://download.pytorch.org/whl/cu118
   ```
3. Vérifiez compatibilité GPU/CUDA

### Q: "FFmpeg not found"
**R:** 
- **Windows** : `choco install ffmpeg`
- **Ubuntu** : `sudo apt-get install ffmpeg`
- **macOS** : `brew install ffmpeg`
- Vérifiez : `ffmpeg -version`

### Q: L'application crash au démarrage
**R:** 
1. Effacez le cache : `npx expo start --clear`
2. Réinstallez les dépendances :
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Mettez à jour Expo Go sur votre téléphone

### Q: La caméra ne fonctionne pas
**R:** 
1. Vérifiez les permissions dans les paramètres du téléphone
2. Redémarrez Expo Go
3. Sur Android, vérifiez les permissions dans `app.json`

### Q: Le modèle 3D ne s'affiche pas
**R:** 
1. Vérifiez que le fichier existe sur le serveur
2. Consultez les logs du serveur
3. Vérifiez le format du fichier (OBJ)
4. Testez avec un modèle 3D simple

## 💰 Coûts

### Q: L'application est-elle gratuite ?
**R:** Oui, le code est open-source (licence MIT).

### Q: Y a-t-il des coûts cachés ?
**R:** 
- **Développement local** : Gratuit
- **Cloud** : Coûts serveur si vous utilisez AWS/GCP/Azure
- **GPU** : Nécessite un GPU NVIDIA (investissement matériel)

### Q: Puis-je monétiser l'application ?
**R:** Oui, la licence MIT le permet. Vous pouvez :
- Vendre l'application
- Offrir un service payant
- Ajouter des publicités
- Respectez la licence MIT (attribution)

## 🔒 Confidentialité

### Q: Mes vidéos sont-elles privées ?
**R:** 
- **Actuellement** : Pas d'authentification, toutes les vidéos sont accessibles sur le serveur
- **Recommandé** : Ajoutez l'authentification pour la production
- Supprimez manuellement les vidéos du serveur

### Q: Les données sont-elles chiffrées ?
**R:** 
- **Actuellement** : Non (HTTP)
- **Production** : Utilisez HTTPS obligatoirement
- Ajoutez le chiffrement des fichiers sensibles

### Q: Puis-je utiliser l'app pour des données sensibles ?
**R:** Non, pas dans l'état actuel. Pour des données sensibles :
- Ajoutez l'authentification
- Utilisez HTTPS
- Chiffrez les fichiers
- Implémentez le rate limiting

## 🚀 Performance

### Q: Pourquoi le traitement est-il si long ?
**R:** 
- **Placeholder actuel** : Rapide (10-30s)
- **Vrai modèle ML** : 2-10 min (normal pour la reconstruction 3D)
- Dépend de :
  - Puissance GPU
  - Complexité objet
  - Durée vidéo

### Q: Comment accélérer le traitement ?
**R:** 
- Utilisez un GPU plus puissant
- Réduisez la durée de vidéo (15-20s)
- Optimisez les paramètres du modèle ML
- Utilisez Instant-NGP (le plus rapide)

### Q: L'application consomme-t-elle beaucoup de batterie ?
**R:** 
- **Capture vidéo** : Modéré
- **Upload** : Faible
- **Visualisation 3D** : Élevé (rendu WebGL)
- Recommandé : Branchez le téléphone pour les longues sessions

## 📚 Développement

### Q: Puis-je contribuer au projet ?
**R:** Oui ! Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

### Q: Quelles sont les priorités de développement ?
**R:** 
1. Intégration de vrais modèles ML
2. Tests automatisés
3. Authentification utilisateur
4. Optimisation performances

### Q: Comment intégrer mon propre modèle ML ?
**R:** Consultez [server/README.md](server/README.md) pour des exemples d'intégration avec :
- Instant-NGP
- Nerfstudio
- Gaussian Splatting

### Q: L'application supporte-t-elle TypeScript ?
**R:** 
- **Actuellement** : Non (JavaScript)
- **Possible** : Oui, migration facile
- Contribution bienvenue !

## 🌍 Compatibilité

### Q: L'application fonctionne-t-elle sur tablette ?
**R:** Oui, compatible avec :
- iPad
- Tablettes Android
- L'interface s'adapte à la taille d'écran

### Q: Puis-je utiliser l'app sur le web ?
**R:** 
- **Actuellement** : Non (caméra native requise)
- **Possible** : Avec adaptations (WebRTC)
- Contribution bienvenue !

### Q: Quelles langues sont supportées ?
**R:** 
- **Actuellement** : Français uniquement
- **À venir** : Anglais, autres langues
- Contribution traduction bienvenue !

---

## 📞 Autres Questions ?

Si votre question n'est pas listée ici :
1. Consultez la [documentation complète](README.md)
2. Cherchez dans les [issues GitHub](https://github.com/VOTRE-REPO/issues)
3. Ouvrez une nouvelle issue avec le label `question`

**Dernière mise à jour** : 2025-10-21
