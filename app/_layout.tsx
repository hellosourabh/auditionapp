import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import { StatusBarComponent } from '@/components/StatusBarComponent';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBarComponent />
        </>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}