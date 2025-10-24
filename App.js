import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import Navigation from './src/config/navigation';
import { theme } from './src/theme/theme';

// Komponen utama aplikasi
export default function App() {
  // Memuat font kustom
  const [fontsLoaded, error] = useFonts({
    'PlayfairDisplay-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
    'PlayfairDisplay-BoldItalic': require('./assets/fonts/PlayfairDisplay-BoldItalic.ttf'),
    'PlayfairDisplay-Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
    'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
    'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
  });
// Menangani status pemuatan font
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        {/* Loading screen with consistent styling */}
      </View>
    );
  }
  // Menangani error pemuatan font
  if (error) {
    console.error('Font loading error:', error);
    return (
      <View style={styles.errorContainer}>
        {/* Error screen with consistent styling */}
      </View>
    );
  }
  // Struktur utama aplikasi dengan penyedia konteks dan navigasi
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <CartProvider>
          <Navigation />
        </CartProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
// Gaya untuk komponen utama
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
