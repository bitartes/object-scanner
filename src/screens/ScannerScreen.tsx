import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Camera } from '../components/Camera'
import { useCamera } from '../hooks/useCamera'
import { analyzeImage } from '../services/openai'

export const ScannerScreen: React.FC = () => {
  const {
    permission,
    requestPermission,
    scanning,
    setScanning,
    result,
    setResult,
    facing,
    zoom,
    cameraRef,
    pinchGesture,
    toggleCameraFacing,
    takePicture,
  } = useCamera()

  const handleCapture = async () => {
    setScanning(true)
    setResult('')

    try {
      const base64Image = await takePicture()
      if (base64Image) {
        const analysis = await analyzeImage(base64Image)
        setResult(analysis)
      }
    } catch (error) {
      setResult(error instanceof Error ? error.message : String(error))
    } finally {
      setScanning(false)
    }
  }

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#1a237e', '#0d47a1']} style={styles.gradientContainer}>
          <Text style={styles.permissionText}>We need your permission to use the camera</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    )
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Camera
          cameraRef={cameraRef}
          facing={facing}
          zoom={zoom}
          scanning={scanning}
          pinchGesture={pinchGesture}
          onToggleFacing={toggleCameraFacing}
          onTakePicture={handleCapture}
        />
        {result && !scanning && (
          <LinearGradient colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)']} style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </LinearGradient>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
  },
  resultText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
})
