import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonPrimary from '../components/ButtonPrimary';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';
import { useProducts } from '../context/ProductContext';
import { dashboardScreenStyles } from '../theme/DashboardScreenStyles';

// Komponen layar Dashboard
const DashboardScreen = ({ navigation }) => {
  const { products } = useProducts();
  return (
    // Struktur utama layar dashboard
    <View style={dashboardScreenStyles.container}>
      <StatusBar barStyle="dark-content" />
      <Navbar navigation={navigation} />

      <ScrollView contentContainerStyle={dashboardScreenStyles.scrollContent}>
        {/* Hero Section */}
        <View style={dashboardScreenStyles.heroContainer}>
          {/*Gambar hero dengan overlay dan teks deskripsi*/}
          <View style={dashboardScreenStyles.heroImageWrapper}>
            <Image
              source={require('../../assets/images/hero-dessert.png')}
              style={dashboardScreenStyles.heroImage}
            />
            {/*Overlay dengan teks deskripsi*/}
            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
              style={dashboardScreenStyles.heroOverlay}
            />{/*Overlay gradient*/}
            <View style={dashboardScreenStyles.heroTextContainer}>
              <ThemeText variant="heroDescription">
                Discover our exquisite collection of handcrafted desserts, where French elegance meets modern sophistication.
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Shop Now Button */}
        <View style={dashboardScreenStyles.buttonContainer}>
          <ButtonPrimary
            title="SHOP NOW"
            onPress={() => navigation.navigate('Catalog')}
            style={dashboardScreenStyles.shopButton}
          />
        </View>

        {/* Product Carousel */}
        <View style={dashboardScreenStyles.carouselContainer}>
          <ThemeText variant="sectionTitle" style={dashboardScreenStyles.sectionTitleOverride}>
            Signature Collection
          </ThemeText>
          {/*Carousel scrollable horizontal */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={dashboardScreenStyles.carousel}
          >{/*Menampilkan produk dalam carousel*/}
            {products.map((product, index) => (
              <View key={product.id} style={dashboardScreenStyles.productCardWrapper}>
                <ProductCard
                  product={product}
                  onPress={() => navigation.navigate('Detail', { product })}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

