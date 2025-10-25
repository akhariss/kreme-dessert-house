import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';
// Komponen layar Tentang Kami
const AboutScreen = ({ navigation }) => {
  return (
    // Struktur utama layar tentang kami
    <View style={styles.container}>
      {/* Status bar dengan konten gelap */}
      <StatusBar barStyle="dark-content" />
      {/* Navbar untuk navigasi */}
      <Navbar navigation={navigation} />
      {/* Konten yang dapat digulir */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Interior Image */}
        <View style={styles.imageSection}>
          <Image
            source={require('../../assets/images/about-interior.png')}
            style={styles.interiorImage}
            resizeMode="cover"
          />
          {/* Overlay gradient pada gambar */}
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)']}
            style={styles.imageOverlay}
          />
        </View>

        {/* Story Section */}
        <View style={styles.storySection}>
          {/* Judul dan deskripsi cerita kami */}
          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
            Our Story
          </ThemeText>
          {/* Deskripsi tentang Kremé Dessert House */}
          <ThemeText variant="productName" style={{ color: theme.colors.black, lineHeight: 28, fontSize: theme.fontSizes.md }}>
            Kremé Dessert House embodies the essence of French patisserie excellence. Each creation is a masterpiece, crafted with passion and precision to deliver unparalleled quality and elegance.
          </ThemeText>
        </View>

        {/* Values Section */}
        <View style={styles.valuesSection}>
          {/* Judul nilai-nilai kami */}
          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
            Our Values
          </ThemeText>
          {/* Daftar nilai-nilai kami */}
          <View style={styles.valuesList}>
            <View style={styles.valueItem}>
              <ThemeText variant="brandName" style={{ color: theme.colors.primary, fontSize: 32 }}>★</ThemeText>
              <ThemeText variant="productName" style={{ color: theme.colors.black, marginTop: theme.spacing.sm }}>
                Excellence
              </ThemeText>
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'center', lineHeight: 22 }}>
                Uncompromising quality in every creation
              </ThemeText>
            </View>
            <View style={styles.valueItem}>
              <ThemeText variant="brandName" style={{ color: theme.colors.accent, fontSize: 32 }}>♡</ThemeText>
              <ThemeText variant="productName" style={{ color: theme.colors.black, marginTop: theme.spacing.sm }}>
                Passion
              </ThemeText>
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'center', lineHeight: 22 }}>
                Love infused in every artisanal piece
              </ThemeText>
            </View>

            <View style={styles.valueItem}>
              <ThemeText variant="brandName" style={{ color: theme.colors.darkPink, fontSize: 32 }}>∞</ThemeText>
              <ThemeText variant="productName" style={{ color: theme.colors.black, marginTop: theme.spacing.sm }}>
                Tradition
              </ThemeText>
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'center', lineHeight: 22 }}>
                Honoring French patisserie heritage
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          {/* Judul kunjungi kami */}
          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
            Visit Us
          </ThemeText>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Ionicons name="location-outline" size={20} color={theme.colors.primary} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, marginLeft: theme.spacing.sm }}>
                23 Avenue des Champs-Élysées{'\n'}Jakarta Selatan, Indonesia
              </ThemeText>
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="time-outline" size={20} color={theme.colors.primary} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, marginLeft: theme.spacing.sm }}>
                Mon - Sun: 10:00 AM - 9:00 PM
              </ThemeText>
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, marginLeft: theme.spacing.sm }}>
                hello@kremedessert.com
              </ThemeText>
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={20} color={theme.colors.primary} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, marginLeft: theme.spacing.sm }}>
                +62 21 1234 5678
              </ThemeText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
// Gaya untuk komponen AboutScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xxl,
  },
  imageSection: {
    marginBottom: theme.spacing.xxl,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  interiorImage: {
    width: '100%',
    height: 250,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storySection: {
    marginBottom: theme.spacing.xxl,
    alignItems: 'center',
  },
  valuesSection: {
    marginBottom: theme.spacing.xxl,
    alignItems: 'center',
  },
  valuesList: {
    width: '100%',
  },
  valueItem: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  contactSection: {
    alignItems: 'center',
  },
  contactInfo: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
});

export default AboutScreen;
