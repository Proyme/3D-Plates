import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>3D</Text>
        <Text style={styles.subtitle}>Reconstruction 3D par IA</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Film Object Button */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Camera')}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="videocam" size={32} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Filmer un objet</Text>
              <Text style={styles.cardSubtitle}>Vidéo 360° • Min. 15 secondes</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Import Video Button */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Import')}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="cloud-upload-outline" size={32} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Importer une vidéo</Text>
              <Text style={styles.cardSubtitle}>Depuis votre galerie</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Instructions Section */}
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>Instructions</Text>
          
          <View style={styles.instructionItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>1</Text>
            </View>
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionTitle}>Objet isolé et centré</Text>
              <Text style={styles.instructionDescription}>
                Placez l'objet seul sur une surface neutre. Cadrez UNIQUEMENT l'objet, pas le sol/table
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>2</Text>
            </View>
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionTitle}>Tournez lentement</Text>
              <Text style={styles.instructionDescription}>
                Faites un tour complet autour de l'objet en 15-30 secondes
              </Text>
            </View>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>3</Text>
            </View>
            <View style={styles.instructionTextContainer}>
              <Text style={styles.instructionTitle}>Éclairage uniforme</Text>
              <Text style={styles.instructionDescription}>
                Évitez les ombres fortes et le contre-jour
              </Text>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Conseils</Text>
          <Text style={styles.tipItem}>• Placez l'objet sur une surface neutre (blanc/gris)</Text>
          <Text style={styles.tipItem}>• Cadrez serré: l'objet doit remplir l'écran</Text>
          <Text style={styles.tipItem}>• Vous tournez autour, l'objet reste fixe</Text>
          <Text style={styles.tipItem}>• Distance: 30-50cm, téléphone stable</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  instructionsSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  numberText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionTextContainer: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  instructionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tipsSection: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 4,
  },
});
