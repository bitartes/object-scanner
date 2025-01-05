import { useState, useRef } from 'react';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Gesture } from 'react-native-gesture-handler';

export const useCamera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('');
  const [facing, setFacing] = useState<CameraType>('back');
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<CameraView>(null);
  const lastScale = useRef(1);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      lastScale.current = 1;
    })
    .onUpdate((event) => {
      const delta = event.scale - lastScale.current;
      lastScale.current = event.scale;
      
      const newZoom = Math.min(Math.max(zoom + (delta * 0.3), 0), 0.9);
      setZoom(newZoom);
    });

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (!cameraRef.current || scanning) return null;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
        exif: false,
        skipProcessing: true,
      });

      const manipulatedImage = await manipulateAsync(
        photo.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.8, format: SaveFormat.JPEG, base64: true }
      );

      return manipulatedImage.base64;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  return {
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
  };
};
