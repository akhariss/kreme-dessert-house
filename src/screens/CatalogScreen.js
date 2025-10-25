import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import ThemeText from '../components/atoms/ThemeText';
import { products } from '../data/products';
import { theme } from '../theme/theme';
// Komponen layar Katalog
const CatalogScreen = ({ navigation }) => {
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Navbar navigation={navigation} />
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <ThemeText variant="sectionTitle" style={styles.headerTitle}>Our Collection</ThemeText>
          <ThemeText variant="tagline" style={styles.headerSubtitle}>Handcrafted Perfection</ThemeText>
        </View>
      </View>
      {/*Area pencarian*/}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={theme.colors.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search desserts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.gray}
        />
      </View>
      {/*Daftar produk*/}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemeText variant="description" style={styles.emptyText}>No desserts found</ThemeText>
          </View>
        }
      />
    </View>
  );
};
// Gaya untuk komponen CatalogScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xxl+10,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.medium,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: theme.colors.black,
  },
  headerSubtitle: {
    color: theme.colors.black,
    marginTop: theme.spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    margin: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.small,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSizes.md,
    color: theme.colors.black,
  },
  productList: {
    padding: theme.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    color: theme.colors.gray,
  },
});

export default CatalogScreen;
