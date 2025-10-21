import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

// ⚠️ IMPORTANT: CONFIGURATION DU SERVEUR ⚠️
// Remplacez YOUR_SERVER_IP par l'adresse IP de votre serveur
// Exemple: 'http://192.168.1.100:5000'
// Pour trouver votre IP: 
//   - Windows: ipconfig
//   - Linux/Mac: ifconfig ou ip addr show
const SERVER_URL = 'http://YOUR_SERVER_IP:5000';

export default function ProcessingScreen({ route, navigation }) {
  const { videoUri } = route.params;
  const [status, setStatus] = useState('uploading'); // uploading, processing, completed, error
  const [progress, setProgress] = useState(0);
  const [modelUrl, setModelUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    uploadAndProcess();
  }, []);

  const uploadAndProcess = async () => {
    try {
      setStatus('uploading');
      setProgress(10);

      // Prepare form data
      const formData = new FormData();
      
      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(videoUri);
      
      formData.append('video', {
        uri: videoUri,
        type: 'video/mp4',
        name: 'object_video.mp4',
      });

      setProgress(30);

      // Upload to server
      const response = await axios.post(`${SERVER_URL}/api/reconstruct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000, // 5 minutes timeout
      });

      setProgress(50);
      setStatus('processing');

      // Poll for completion
      if (response.data.jobId) {
        pollJobStatus(response.data.jobId);
      } else if (response.data.modelUrl) {
        // Direct response with model
        setModelUrl(response.data.modelUrl);
        setProgress(100);
        setStatus('completed');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setStatus('error');
      setErrorMessage(
        error.response?.data?.error || 
        'Impossible de se connecter au serveur. Vérifiez que le serveur est démarré.'
      );
    }
  };

  const pollJobStatus = async (jobId) => {
    try {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/api/status/${jobId}`);
          
          if (response.data.status === 'completed') {
            clearInterval(interval);
            setModelUrl(response.data.modelUrl);
            setProgress(100);
            setStatus('completed');
          } else if (response.data.status === 'error') {
            clearInterval(interval);
            setStatus('error');
            setErrorMessage(response.data.error || 'Erreur lors de la reconstruction');
          } else if (response.data.progress) {
            setProgress(50 + (response.data.progress / 2));
          }
        } catch (error) {
          console.error('Error polling status:', error);
        }
      }, 3000); // Poll every 3 seconds

      // Cleanup on unmount
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error in polling:', error);
      setStatus('error');
      setErrorMessage('Erreur lors du suivi du traitement');
    }
  };

  const retry = () => {
    setStatus('uploading');
    setProgress(0);
    setErrorMessage('');
    uploadAndProcess();
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Envoi de la vidéo au serveur...';
      case 'processing':
        return 'Reconstruction 3D en cours...';
      case 'completed':
        return 'Reconstruction terminée !';
      case 'error':
        return 'Erreur';
      default:
        return 'Traitement...';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />;
      case 'error':
        return <Ionicons name="close-circle" size={80} color="#F44336" />;
      default:
        return <ActivityIndicator size="large" color="#000" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              'Annuler',
              'Voulez-vous vraiment annuler le traitement ?',
              [
                { text: 'Non', style: 'cancel' },
                { text: 'Oui', onPress: () => navigation.navigate('Home') },
              ]
            );
          }}
        >
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reconstruction 3D</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.statusContainer}>
          {getStatusIcon()}
          
          <Text style={styles.statusText}>{getStatusMessage()}</Text>
          
          {status === 'error' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          {(status === 'uploading' || status === 'processing') && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>
          )}

          {status === 'completed' && modelUrl && (
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigation.navigate('Viewer', { modelUrl })}
            >
              <Ionicons name="cube-outline" size={24} color="#FFF" />
              <Text style={styles.viewButtonText}>Voir le modèle 3D</Text>
            </TouchableOpacity>
          )}

          {status === 'error' && (
            <TouchableOpacity style={styles.retryButton} onPress={retry}>
              <Ionicons name="refresh" size={24} color="#FFF" />
              <Text style={styles.retryButtonText}>Réessayer</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Info Box */}
        {(status === 'uploading' || status === 'processing') && (
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={24} color="#666" />
            <Text style={styles.infoText}>
              La reconstruction 3D peut prendre plusieurs minutes selon la complexité de l'objet.
              Veuillez patienter...
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  progressContainer: {
    width: '100%',
    marginTop: 32,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
  },
  viewButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20,
  },
});
