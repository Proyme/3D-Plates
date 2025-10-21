import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ImportScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const pickVideo = async () => {
    try {
      setLoading(true);
      
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          'Nous avons besoin de votre permission pour accéder à la galerie'
        );
        setLoading(false);
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      setLoading(false);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const videoUri = result.assets[0].uri;
        const duration = result.assets[0].duration;

        // Check minimum duration (15 seconds)
        if (duration && duration < 15000) {
          Alert.alert(
            'Vidéo trop courte',
            'La vidéo doit durer au moins 15 secondes pour une reconstruction 3D de qualité.'
          );
          return;
        }

        // Navigate to processing screen
        navigation.navigate('Processing', { videoUri });
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Erreur', 'Impossible de charger la vidéo');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Importer une vidéo</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="cloud-upload-outline" size={80} color="#666" />
        </View>

        <Text style={styles.title}>Sélectionnez une vidéo</Text>
        <Text style={styles.description}>
          Choisissez une vidéo depuis votre galerie montrant un objet filmé à 360°
        </Text>

        <TouchableOpacity
          style={styles.importButton}
          onPress={pickVideo}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="folder-open-outline" size={24} color="#FFF" />
              <Text style={styles.importButtonText}>Parcourir la galerie</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Requirements */}
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Exigences de la vidéo :</Text>
          
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.requirementText}>Durée minimum : 15 secondes</Text>
          </View>
          
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.requirementText}>Tour complet à 360° de l'objet</Text>
          </View>
          
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.requirementText}>Objet bien éclairé et centré</Text>
          </View>
          
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.requirementText}>Mouvement fluide et stable</Text>
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  importButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  requirementsContainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
});
