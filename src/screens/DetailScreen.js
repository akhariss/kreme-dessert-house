import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';
import ButtonPrimary from '../components/ButtonPrimary';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';
import { productService } from '../backend/productService';
import { detailScreenStyles } from '../theme/DetailScreenStyles';

// Komponen layar Detail
const DetailScreen = ({ route, navigation }) => {
  // Mendapatkan data produk dari parameter route (basic info)
  const { product: initialProduct } = route.params;
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mendapatkan fungsi tambah ke keranjang dari konteks keranjang
  const { addToCart } = useCart();

  // Fetch Full Details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fullData = await productService.getProductById(initialProduct.id);

        // Handle product_details (Array vs Object robust check)
        let details = null;
        if (Array.isArray(fullData?.product_details)) {
          details = fullData.product_details[0];
        } else if (fullData?.product_details) {
          details = fullData.product_details;
        }

        if (details) {
          setProductDetails(details);
        }
      } catch (error) {
        console.error("Failed to load details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [initialProduct.id]);


  // Fungsi untuk memformat harga produk
  const formatPrice = (price) => {
    return `$${price.toLocaleString('en-US')}`;
  };
  // Fungsi untuk menangani penambahan produk ke keranjang
  const handleAddToCart = () => {
    addToCart(initialProduct);
    navigation.navigate('Cart');
  };
  // Struktur utama layar detail produk
  return (
    <View style={detailScreenStyles.container}>
      {/* Status bar dengan gaya konten terang */}
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        style={detailScreenStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
      </TouchableOpacity>
      {/* Konten gulir layar detail */}
      <ScrollView contentContainerStyle={detailScreenStyles.scrollContent}>
        <View style={detailScreenStyles.imageContainer}>
          <Image source={initialProduct.image} style={detailScreenStyles.image} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
            locations={[0, 0.5, 0.8, 1]}
            style={detailScreenStyles.imageOverlay}
          />
          <LinearGradient
            colors={['rgba(247,199,217,0.1)', 'rgba(255,255,255,0.1)']}
            style={detailScreenStyles.imagePremiumOverlay}
          />
        </View>
        {/* Konten detail produk */}
        <View style={detailScreenStyles.contentContainer}>
          <View style={detailScreenStyles.categoryBadge}>
            <ThemeText variant="productDescription" style={detailScreenStyles.categoryText}>
              {initialProduct.category}
            </ThemeText>
          </View>
          {/* Nama produk dengan variasi gaya berdasarkan produk */}
          <ThemeText
            variant="productName"
            style={detailScreenStyles.name}
          >
            {initialProduct.name}
          </ThemeText>
          {/* Harga produk */}
          <ThemeText variant="productName" style={detailScreenStyles.price}>
            {formatPrice(initialProduct.price)}
          </ThemeText>
          {/* Deskripsi produk */}
          <View style={detailScreenStyles.divider} />
          <ThemeText variant="sectionTitle" style={detailScreenStyles.sectionTitle}>Description</ThemeText>
          <ThemeText variant="description" style={detailScreenStyles.description}>
            {initialProduct.description}
          </ThemeText>

          {/* Detail tambahan produk (DINAMIS) */}
          <View style={detailScreenStyles.divider} />

          {loading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} style={detailScreenStyles.loadingIndicator} />
          ) : productDetails ? (
            <>
              <ThemeText variant="sectionTitle" style={detailScreenStyles.sectionTitle}>Ingredients</ThemeText>
              <ThemeText variant="description" style={detailScreenStyles.description}>
                {productDetails.ingredients || 'Secret recipe.'}
              </ThemeText>

              <View style={detailScreenStyles.divider} />

              <ThemeText variant="sectionTitle" style={detailScreenStyles.sectionTitle}>Allergen Information</ThemeText>
              <ThemeText variant="description" style={detailScreenStyles.description}>
                {productDetails.allergen_information || 'Please contact staff for allergen info.'}
              </ThemeText>

              <ThemeText variant="sectionTitle" style={detailScreenStyles.sectionTitle}>Storage & Care</ThemeText>
              <ThemeText variant="description" style={detailScreenStyles.storageCare}>
                {productDetails.storage_care || 'Best consumed fresh.'}
              </ThemeText>
            </>
          ) : (
            <ThemeText variant="description" style={detailScreenStyles.unavailableText}>
              Details unavailable.
            </ThemeText>
          )}
        </View>
      </ScrollView>
      {/* Tombol tambah ke keranjang */}
      <View style={detailScreenStyles.footer}>
        <ButtonPrimary
          title="ADD TO CART"
          onPress={handleAddToCart}
          variant="secondary"
          style={detailScreenStyles.addButton}
        />
      </View>
    </View>
  );
};

export default DetailScreen;
