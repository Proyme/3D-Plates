// Configuration de l'application
// Copiez ce fichier en config.js et modifiez les valeurs selon votre environnement

export const CONFIG = {
  // URL du serveur de reconstruction 3D
  // Remplacez par l'adresse IP de votre serveur
  // Exemple: 'http://192.168.1.100:5000'
  SERVER_URL: 'http://YOUR_SERVER_IP:5000',
  
  // Configuration de la caméra
  CAMERA: {
    MIN_RECORDING_DURATION: 15, // secondes
    MAX_RECORDING_DURATION: 60, // secondes
    VIDEO_QUALITY: '1080p',
  },
  
  // Configuration de l'upload
  UPLOAD: {
    MAX_FILE_SIZE: 500 * 1024 * 1024, // 500MB
    TIMEOUT: 300000, // 5 minutes
  },
  
  // Configuration de la reconstruction
  RECONSTRUCTION: {
    POLL_INTERVAL: 3000, // 3 secondes
    MAX_RETRIES: 3,
  },
};
