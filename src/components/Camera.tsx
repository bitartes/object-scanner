import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { GestureDetector } from 'react-native-gesture-handler';

interface CameraProps {
  cameraRef: React.RefObject<CameraView>;
  facing: 'front' | 'back';
  zoom: number;
  scanning: boolean;
  pinchGesture: any;
  onToggleFacing: () => void;
  onTakePicture: () => void;
}

export const Camera: React.FC<CameraProps> = ({
  cameraRef,
  facing,
  zoom,
  scanning,
  pinchGesture,
  onToggleFacing,
  onTakePicture,
}) => {
  return (
    <GestureDetector gesture={pinchGesture}>
      <CameraView 
        style={styles.camera} 
        ref={cameraRef} 
        facing={facing}
        zoom={zoom}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={onToggleFacing}
            >
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.scanFrame}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={[styles.captureButton, scanning && styles.buttonDisabled]}
              onPress={onTakePicture}
              disabled={scanning}
            >
              {scanning ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <Ionicons name="scan" size={30} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 40,
  },
  flipButton: {
    padding: 10,
  },
  scanFrame: {
    flex: 1,
    margin: 50,
    borderRadius: 20,
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
    borderTopLeftRadius: 20,
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
    borderTopRightRadius: 20,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
    borderBottomLeftRadius: 20,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
    borderBottomRightRadius: 20,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#64b5f6',
  },
});
