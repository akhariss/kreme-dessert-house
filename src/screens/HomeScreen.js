import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import ButtonPrimary from '../components/ButtonPrimary';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';

// Get the device screen height dynamically for the full-screen effect
const screenHeight = Dimensions.get('window').height;


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Status bar icons set to light for contrast */}
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* HERO SECTION: Video set to full screen height */}
        <TouchableOpacity style={styles.heroSection} onPress={() => navigation.navigate('Dashboard')} activeOpacity={1}>
          <Video
            source={{
              uri: Dimensions.get('window').width < 1024
                ? 'https://laduree.com/cdn/shop/videos/c/vp/34710966b21246fa8170afc4f03fb935/34710966b21246fa8170afc4f03fb935.HD-1080p-7.2Mbps-59755901.mp4?v=0'
                : 'https://laduree.com/cdn/shop/videos/c/vp/7336762bff984b58bd68351be3beecb3/7336762bff984b58bd68351be3beecb3.HD-1080p-4.8Mbps-59756568.mp4?v=0',
            }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted
            useNativeControls={false}
          />
          {/* LinearGradient Overlay */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)']}
            style={styles.overlay}
          >
            <View style={styles.heroContent}>

              {/* BRAND NAME - Playfair Style (Serif, Bold, Spacing) */}
              <ThemeText variant="brandName" style={styles.brandNameOverride}>Kremé</ThemeText>
              <ThemeText variant="subtitle" style={styles.brandSubtitleOverride}>Dessert House</ThemeText>
            </View>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    // Full screen height implementation
    height: screenHeight,
    width: '100%',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },

  // *** OVERRIDE STYLES for ThemeText components ***
  brandNameOverride: {
    fontFamily: 'PlayfairDisplay-Bold',
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  brandSubtitleOverride: {
    fontFamily: 'PlayfairDisplay-Regular',
    letterSpacing: 6,
    marginBottom: theme.spacing.lg * 2,
  },

  // *** TAGLINE - Subtle Serif Style ***
  tagline: {
    fontSize: theme.fontSizes.lg + 2,
    fontFamily: 'PlayfairDisplay-Italic',
    color: theme.colors.white,
    marginBottom: theme.spacing.xl,
    fontWeight: 'normal',
    letterSpacing: 1,
  },

  // *** DESCRIPTION - Clean and Readable Sans-serif Style ***
  description: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Regular',
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    lineHeight: 28, // Increased line height for elegant readability
    paddingHorizontal: theme.spacing.lg,
  },

  exploreButton: {
    minWidth: 250,
  },
  // ... (Other feature styles are kept but not displayed for brevity)
  featuresSection: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.secondary,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: 'bold',
    color: theme.colors.black,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  featuresGrid: {
    gap: theme.spacing.md,
  },
  featureCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  featureTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen;
