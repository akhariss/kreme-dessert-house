import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemeText from '../../components/atoms/ThemeText';
import { theme } from '../../theme/theme';
import { useProducts } from '../../context/ProductContext';
import { productService } from '../../backend/productService';
import Navbar from '../../components/Navbar';
import { adminProductListScreenStyles as styles } from '../../theme/AdminProductListScreenStyles';

/*
 * ADMIN: Product List Screen
 * Menampilkan daftar produk untuk dikelola (Edit/Delete)
 */
const AdminProductListScreen = ({ navigation }) => {
  const { products, refreshProducts, isLoading } = useProducts();
  const [deletingId, setDeletingId] = useState(null);

  // Handle Delete Button
  const handleDelete = (id, name) => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeletingId(id);
            const result = await productService.deleteProduct(id);
            if (result.success) {
              await refreshProducts(); // Reload list
              Alert.alert("Success", "Product deleted successfully.");
            } else {
              Alert.alert("Error", "Failed to delete product.");
            }
            setDeletingId(null);
          }
        }
      ]
    );
  };

  // Render per Item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <ThemeText variant="productName" style={styles.name}>{item.name}</ThemeText>
        <ThemeText variant="description" style={styles.price}>
          ${item.price?.toLocaleString()} • {item.category}
        </ThemeText>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('AdminEditProduct', { product: item })}
        >
          <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => handleDelete(item.id, item.name)}
          disabled={deletingId === item.id}
        >
          {deletingId === item.id ? (
            <Ionicons name="hourglass-outline" size={20} color={theme.colors.white} />
          ) : (
            <Ionicons name="trash-outline" size={20} color={theme.colors.white} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Navbar navigation={navigation} title="Admin Dashboard" />

      <View style={styles.header}>
        <ThemeText variant="sectionTitle">Product Management</ThemeText>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshProducts} />
        }
      />

      {/* FAB: Add New Product */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AdminEditProduct')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};


export default AdminProductListScreen;
