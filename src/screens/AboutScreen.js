import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';
import { aboutScreenStyles } from '../theme/AboutScreenStyles';

// Komponen layar Tentang Kami
const AboutScreen = ({ navigation }) => {
  return (
    // Struktur utama layar tentang kami
    <View style={aboutScreenStyles.container}>
      {/* Status bar dengan konten gelap */}
      <StatusBar barStyle="dark-content" />
      {/* Navbar untuk navigasi */}
      <Navbar navigation={navigation} />
      {/* Konten yang dapat digulir */}
      <ScrollView contentContainerStyle={aboutScreenStyles.scrollContent}>
        {/* Interior Image */}
        <View style={aboutScreenStyles.imageSection}>
          <Image
            source={require('../../assets/images/about-interior.png')}
            style={aboutScreenStyles.interiorImage}
            resizeMode="cover"
          />
          {/* Overlay gradient pada gambar */}
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)']}
            style={aboutScreenStyles.imageOverlay}
          />
        </View>

        {/* Story Section */}
        <View style={aboutScreenStyles.storySection}>
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
        <View style={aboutScreenStyles.valuesSection}>
          {/* Judul nilai-nilai kami */}
          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
            Our Values
          </ThemeText>
          {/* Daftar nilai-nilai kami */}
          <View style={aboutScreenStyles.valuesList}>
            <View style={aboutScreenStyles.valueItem}>
              <ThemeText variant="brandName" style={{ color: theme.colors.primary, fontSize: 32 }}>★</ThemeText>
              <ThemeText variant="productName" style={{ color: theme.colors.black, marginTop: theme.spacing.sm }}>
                Excellence
              </ThemeText>
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'center', lineHeight: 22 }}>
                Uncompromising quality in every creation
              </ThemeText>
            </View>
            <View style={aboutScreenStyles.valueItem}>
              <ThemeText variant="brandName" style={{ color: theme.colors.accent, fontSize: 32 }}>♡</ThemeText>
              <ThemeText variant="productName" style={{ color: theme.colors.black, marginTop: theme.spacing.sm }}>
                Passion
              </ThemeText>
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'center', lineHeight: 22 }}>
                Love infused in every artisanal piece
              </ThemeText>
            </View>

            <View style={aboutScreenStyles.valueItem}>
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
        <View style={aboutScreenStyles.contactSection}>
          {/* Judul kunjungi kami */}
          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>
            Visit Us
          </ThemeText>

          <View style={aboutScreenStyles.contactInfo}>
            <View style={aboutScreenStyles.contactItem}>
              <Ionicons name="location-outline" size={20} color={theme.colors.primary} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, marginLeft: theme.spacing.sm }}>
                23 Avenue des Champs-Élysées{'\n'}Jakarta Selatan, Indonesia
              </ThemeText>
            </View>

            <View style={aboutScreenStyles.contactItem}>
              <Ionicons name="time-outline" size={20} color={theme.colors.primary} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, marginLeft: theme.spacing.sm }}>
                Mon - Sun: 10:00 AM - 9:00 PM
              </ThemeText>
            </View>

            <View style={aboutScreenStyles.contactItem}>
              <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, marginLeft: theme.spacing.sm }}>
                hello@kremedessert.com
              </ThemeText>
            </View>

            <View style={aboutScreenStyles.contactItem}>
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

export default AboutScreen;
