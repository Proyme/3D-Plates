import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PanResponder,
} from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { Ionicons } from '@expo/vector-icons';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ViewerScreen({ route, navigation }) {
  const { modelUrl } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  // Pan responder for rotation
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (modelRef.current) {
          rotationRef.current.y += gestureState.dx * 0.01;
          rotationRef.current.x += gestureState.dy * 0.01;
        }
      },
    })
  ).current;

  const onContextCreate = async (gl) => {
    try {
      // Setup renderer
      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      renderer.setClearColor(0xf0f0f0);

      // Setup scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Setup camera
      const camera = new THREE.PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      cameraRef.current = camera;

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight2.position.set(-5, -5, -5);
      scene.add(directionalLight2);

      // Load model
      await loadModel(scene, modelUrl);

      setLoading(false);

      // Animation loop
      const render = () => {
        requestAnimationFrame(render);

        // Apply rotation
        if (modelRef.current) {
          modelRef.current.rotation.y = rotationRef.current.y;
          modelRef.current.rotation.x = rotationRef.current.x;
        }

        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      render();
    } catch (err) {
      console.error('Error setting up 3D viewer:', err);
      setError('Erreur lors de l\'initialisation du viewer 3D');
      setLoading(false);
    }
  };

  const loadModel = async (scene, url) => {
    return new Promise((resolve, reject) => {
      try {
        const fileExtension = url.split('.').pop().toLowerCase();

        if (fileExtension === 'obj') {
          const loader = new OBJLoader();
          loader.load(
            url,
            (object) => {
              // Center and scale the model
              const box = new THREE.Box3().setFromObject(object);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              const scale = 3 / maxDim;

              object.position.sub(center);
              object.scale.multiplyScalar(scale);

              // Add material if needed
              object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  if (!child.material) {
                    child.material = new THREE.MeshPhongMaterial({
                      color: 0x888888,
                      flatShading: false,
                    });
                  }
                }
              });

              scene.add(object);
              modelRef.current = object;
              resolve();
            },
            undefined,
            (error) => {
              console.error('Error loading OBJ:', error);
              reject(error);
            }
          );
        } else if (fileExtension === 'gltf' || fileExtension === 'glb') {
          const loader = new GLTFLoader();
          loader.load(
            url,
            (gltf) => {
              const object = gltf.scene;

              // Center and scale the model
              const box = new THREE.Box3().setFromObject(object);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              const scale = 3 / maxDim;

              object.position.sub(center);
              object.scale.multiplyScalar(scale);

              scene.add(object);
              modelRef.current = object;
              resolve();
            },
            undefined,
            (error) => {
              console.error('Error loading GLTF:', error);
              reject(error);
            }
          );
        } else {
          // Fallback: create a placeholder cube
          const geometry = new THREE.BoxGeometry(2, 2, 2);
          const material = new THREE.MeshPhongMaterial({ color: 0x888888 });
          const cube = new THREE.Mesh(geometry, material);
          scene.add(cube);
          modelRef.current = cube;
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const resetView = () => {
    rotationRef.current = { x: 0, y: 0 };
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 5);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modèle 3D</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetView}>
          <Ionicons name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 3D Viewer */}
      <View style={styles.viewerContainer} {...panResponder.panHandlers}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.loadingText}>Chargement du modèle 3D...</Text>
          </View>
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={64} color="#F44336" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!error && (
          <GLView
            style={styles.glView}
            onContextCreate={onContextCreate}
          />
        )}
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <View style={styles.instructionItem}>
          <Ionicons name="hand-left-outline" size={24} color="#666" />
          <Text style={styles.instructionText}>Glissez pour faire tourner</Text>
        </View>
        <View style={styles.instructionItem}>
          <Ionicons name="expand-outline" size={24} color="#666" />
          <Text style={styles.instructionText}>Pincez pour zoomer</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            Alert.alert(
              'Télécharger',
              'Fonctionnalité de téléchargement à venir'
            );
          }}
        >
          <Ionicons name="download-outline" size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>Télécharger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            Alert.alert(
              'Partager',
              'Fonctionnalité de partage à venir'
            );
          }}
        >
          <Ionicons name="share-outline" size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>Partager</Text>
        </TouchableOpacity>
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
  resetButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  glView: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
  instructionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
