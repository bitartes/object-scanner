import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScannerScreen } from './src/screens/ScannerScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScannerScreen />
    </GestureHandlerRootView>
  );
}