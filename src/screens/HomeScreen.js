import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import ThemeText from '../components/atoms/ThemeText';
import { homeScreenStyles } from '../theme/HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={homeScreenStyles.container}>
      {/* Status bar icons set to light for contrast */}
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={homeScreenStyles.scrollContent}>

        {/* HERO SECTION: Video set to full screen height */}
        <TouchableOpacity style={homeScreenStyles.heroSection} onPress={() => navigation.navigate('Dashboard')} activeOpacity={1}>
          <Video
            source={{
              uri: Dimensions.get('window').width < 1024
                ? 'https://laduree.com/cdn/shop/videos/c/vp/34710966b21246fa8170afc4f03fb935/34710966b21246fa8170afc4f03fb935.HD-1080p-7.2Mbps-59755901.mp4?v=0'
                : 'https://laduree.com/cdn/shop/videos/c/vp/7336762bff984b58bd68351be3beecb3/7336762bff984b58bd68351be3beecb3.HD-1080p-4.8Mbps-59756568.mp4?v=0',
            }}
            style={homeScreenStyles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted
            useNativeControls={false}
          />
          {/* LinearGradient Overlay */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)']}
            style={homeScreenStyles.overlay}
          >
            <View style={homeScreenStyles.heroContent}>

              {/* BRAND NAME - Playfair Style (Serif, Bold, Spacing) */}
              <ThemeText variant="brandName" style={homeScreenStyles.brandNameOverride}>Kremé</ThemeText>
              <ThemeText variant="subtitle" style={homeScreenStyles.brandSubtitleOverride}>Dessert House</ThemeText>
            </View>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
