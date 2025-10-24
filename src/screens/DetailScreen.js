import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';
import ButtonPrimary from '../components/ButtonPrimary';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';

// Komponen layar Detail
const DetailScreen = ({ route, navigation }) => {
  // Mendapatkan data produk dari parameter route
  const { product } = route.params;
  // Mendapatkan fungsi tambah ke keranjang dari konteks keranjang
  const { addToCart } = useCart();
  // Fungsi untuk memformat harga produk
  const formatPrice = (price) => {
    return `$${price.toLocaleString('en-US')}`;
  };
  // Fungsi untuk menangani penambahan produk ke keranjang
  const handleAddToCart = () => {
    addToCart(product);
    navigation.navigate('Cart');
  };
  // Struktur utama layar detail produk
  return (
    <View style={styles.container}>
      {/* Status bar dengan gaya konten terang */}
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
      </TouchableOpacity>
      {/* Konten gulir layar detail */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
            style={styles.imageOverlay}
          />
          <LinearGradient
            colors={['rgba(247,199,217,0.1)', 'rgba(255,255,255,0.1)']}
            style={styles.imagePremiumOverlay}
          />
        </View>
        {/* Konten detail produk */}
        <View style={styles.contentContainer}>
          <View style={styles.categoryBadge}>
            <ThemeText variant="productDescription" style={{ color: theme.colors.white }}>
              {product.category}
            </ThemeText>
          </View>
          {/* Nama produk dengan variasi gaya berdasarkan produk */}
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
            style={[styles.name, { textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1 }]}
          >
            {product.name}
          </ThemeText>
          {/* Harga produk */}
          <ThemeText variant="productName" style={{ color: theme.colors.accent, fontWeight: 'bold', fontFamily: 'Poppins-Bold', marginBottom: theme.spacing.lg, textShadowColor: 'rgba(212, 175, 55, 0.3)', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 2 }}>
            {formatPrice(product.price)}
          </ThemeText>
          {/* Deskripsi produk */}
          <View style={styles.divider} />
          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1 }}>Description</ThemeText>
          <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'left', marginBottom: theme.spacing.lg, lineHeight: 24 }}>
            {product.description}
          </ThemeText>
          {/* Detail tambahan produk */}
          <View style={styles.divider} />
          {/* Informasi detail produk */}
          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1 }}>Product Details</ThemeText>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.accent} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'left', marginLeft: theme.spacing.sm }}>
                Freshly prepared daily
              </ThemeText>
            </View>
            {/* Informasi detail tambahan */}
            <View style={styles.detailRow}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.accent} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'left', marginLeft: theme.spacing.sm }}>
                Premium ingredients
              </ThemeText>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.accent} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'left', marginLeft: theme.spacing.sm }}>
                Beautiful gift packaging included
              </ThemeText>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.accent} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'left', marginLeft: theme.spacing.sm }}>
                Handcrafted with care
              </ThemeText>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.accent} />
              <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'left', marginLeft: theme.spacing.sm }}>
                Perfect for special occasions
              </ThemeText>
            </View>
          </View>
          {/* Informasi tambahan */}
          <View style={styles.divider} />

          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1 }}>Allergen Information</ThemeText>
          <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'left', marginBottom: theme.spacing.lg, lineHeight: 24 }}>
            Contains: Eggs, Dairy, Wheat, Nuts. Please inform us of any allergies when ordering.
          </ThemeText>
    
          <ThemeText variant="sectionTitle" style={{ textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1 }}>Storage & Care</ThemeText>
          <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'left', lineHeight: 24 }}>
            Best enjoyed within 2-3 days. Store in a cool, dry place or refrigerate for freshness.
          </ThemeText>
        </View>
      </ScrollView>
      {/* Tombol tambah ke keranjang */}
      <View style={styles.footer}>
        <ButtonPrimary
          title="ADD TO CART"
          onPress={handleAddToCart}
          variant="secondary"
          style={[styles.addButton, { shadowColor: theme.colors.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }]}
        />
      </View>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xxl,
  },
  imageContainer: {
    width: '100%',
    height: 450,
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.medium,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePremiumOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: theme.spacing.md,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
    borderWidth: 1,
    borderColor: theme.colors.white,
    zIndex: 10,
  },
  contentContainer: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: theme.colors.darkPink,
  },
  name: {
    fontSize: theme.fontSizes.xxxl,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
    textAlign: 'left',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  divider: {
    height: 2,
    backgroundColor: theme.colors.primary,
    marginVertical: theme.spacing.lg,
    borderRadius: 1,
  },
  detailsContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  footer: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary,
    ...theme.shadows.large,
  },
  addButton: {
    width: '100%',
    minWidth: '100%',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default DetailScreen;
