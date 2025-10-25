import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonPrimary from '../components/ButtonPrimary';
import Navbar from '../components/Navbar';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';
import { products } from '../data/products';

// Mendapatkan dimensi layar
const { width, height } = Dimensions.get('window');
// Komponen layar Dashboard
const DashboardScreen = ({ navigation }) => {
  return (
    // Struktur utama layar dashboard
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Navbar navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          {/*Gambar hero dengan overlay dan teks deskripsi*/}
          <View style={styles.heroImageWrapper}>
            <Image
              source={require('../../assets/images/hero-dessert.png')}
              style={styles.heroImage}
            />
            {/*Overlay dengan teks deskripsi*/}
            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
              style={styles.heroOverlay}
            /> {/*Overlay gradient*/}
            <View style={styles.heroTextContainer}>
              <ThemeText variant="heroDescription">
                Discover our exquisite collection of handcrafted desserts, where French elegance meets modern sophistication.
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Shop Now Button */}
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            title="SHOP NOW"
            onPress={() => navigation.navigate('Catalog')}
            style={styles.shopButton}
          />
        </View>

        {/* Product Carousel */}
        <View style={styles.carouselContainer}>
          <ThemeText variant="sectionTitle" style={styles.sectionTitleOverride}>
            Signature Collection
          </ThemeText>
          {/*Carousel scrollable horizontal */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
            contentInset={{ left: theme.spacing.xl, right: theme.spacing.xl }}
          >{/*Menampilkan produk dalam carousel*/}
            {products.map((product, index) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => navigation.navigate('Detail', { product })}
                activeOpacity={0.8}
              >
                <Image source={product.image} style={styles.carouselImage} />
                <ThemeText
                  variant={
                    product.name === 'Matcha Opera Cake' ? 'productNameMatcha' :
                    product.name === 'Vanilla Bean Éclair' ? 'productNameEclair' :
                    product.name === 'Strawberry Mille-Feuille' ? 'productNameMille' :
                    product.category === 'Macarons' ? 'productNameMacarons' :
                    product.category === 'Tarts' ? 'productNameTarts' :
                    product.category === 'Cakes' ? 'productNameCakes' :
                    product.category === 'Pastries' ? 'productNamePastries' :
                    product.category === 'Pies' ? 'productNamePies' :
                    'productName'
                  }
                  style={{ marginTop: theme.spacing.sm }}
                >
                  {product.name}
                </ThemeText>
                <ThemeText variant="productDescription" style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {product.category}
                </ThemeText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
// Gaya untuk komponen DashboardScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xs,
  },

  heroContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  heroImageWrapper: {
    paddingTop: theme.spacing.xl,
  },
  heroImage: {
    width: width,
    height: height * 0.55,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextContainer: {
    alignItems: 'center',
  },


  buttonContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.md,
  },
  shopButton: {
    minWidth: '100%',
  },
  carouselContainer: {
    marginTop: theme.spacing.xl,
  },
  sectionTitleOverride: {
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  productCard: {
    width: width * 0.6,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    ...theme.shadows.medium,
    marginBottom: theme.spacing.xxl,
  },
  carouselImage: {
    width: '100%',
    height: height * 0.25,
    borderRadius: theme.borderRadius.md,
    resizeMode: 'cover',
  },

});

export default DashboardScreen;
