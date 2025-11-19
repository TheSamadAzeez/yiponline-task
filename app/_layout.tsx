import '../global.css';

import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function Layout() {
  useEffect(() => {
    // Set navigation bar to dark on Android
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync('#000000');
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details" />
      <Stack.Screen name="add-product" />
      <Stack.Screen
        name="edit-product"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
