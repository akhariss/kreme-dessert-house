import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import ThemeText from '../components/atoms/ThemeText';
import { useProducts } from '../context/ProductContext';
import { theme } from '../theme/theme';
import { catalogScreenStyles } from '../theme/CatalogScreenStyles';

// Komponen layar Katalog
const CatalogScreen = ({ navigation }) => {
  const { products, isLoading } = useProducts();

  // State untuk query pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // Memfilter produk berdasarkan query pencarian
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Merender setiap produk dalam daftar
  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('Detail', { product: item })}
    />
  );
  // Struktur utama layar katalog
  return (
    <View style={catalogScreenStyles.container}>
      <StatusBar barStyle="dark-content" />
      <Navbar navigation={navigation} />
      <View style={catalogScreenStyles.header}>
        <View style={catalogScreenStyles.headerCenter}>
          <ThemeText variant="sectionTitle" style={catalogScreenStyles.headerTitle}>Our Collection</ThemeText>
          <ThemeText variant="tagline" style={catalogScreenStyles.headerSubtitle}>Handcrafted Perfection</ThemeText>
        </View>
      </View>
      {/*Area pencarian*/}
      <View style={catalogScreenStyles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={theme.colors.gray}
          style={catalogScreenStyles.searchIcon}
        />
        <TextInput
          style={catalogScreenStyles.searchInput}
          placeholder="Search desserts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.gray}
        />
      </View>
      {/*Daftar produk*/}

      {/* Loading State or Product List */}
      {isLoading ? (
        <View style={catalogScreenStyles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <ThemeText variant="caption" style={catalogScreenStyles.loadingText}>Fetching sweets...</ThemeText>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={catalogScreenStyles.productList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={catalogScreenStyles.emptyContainer}>
              <ThemeText variant="description" style={catalogScreenStyles.emptyText}>No desserts found</ThemeText>
            </View>
          }
        />
      )}
    </View>
  );
};

export default CatalogScreen;
