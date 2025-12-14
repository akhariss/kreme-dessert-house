import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { orderService } from '../backend/orderService';
import ButtonPrimary from '../components/ButtonPrimary';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';
import { cartScreenStyles } from '../theme/CartScreenStyles';

//  Komponen layar Keranjang Belanja
const CartScreen = ({ navigation }) => {
  // Mengakses konteks keranjang belanja
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);

  // Format harga dalam bentuk mata uang
  const formatPrice = (price) => {
    // Mengubah angka menjadi format mata uang USD
    return `$${price.toLocaleString('en-US')}`;
  };

  // Handle Checkout Process
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!user) {
      Alert.alert("Login Required", "Please login to checkout.");
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        userId: user.id || user.clerk_user_id, // Fallback ID handler
        items: cartItems,
        totalAmount: getTotalPrice()
      };

      console.log('Processing Order for:', orderData.userId);

      // Create Order in Backend
      const result = await orderService.createOrder(orderData.userId, orderData.items, orderData.totalAmount);

      if (result.success) {
        // Clear Local & Remote Cart
        clearCart();
        Alert.alert(
          "Order Success! 🍰",
          "Thank you for your sweet order! It is now being processed.",
          [{ text: "OK", onPress: () => navigation.navigate('Dashboard') }]
        );
      } else {
        throw new Error(result.error || "Failed to create order");
      }

    } catch (error) {
      console.error("Checkout Failed:", error);
      Alert.alert("Checkout Failed", "Could not process your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Konfirmasi Penghapusan Item
  const handleRemoveItem = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this dessert?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => removeFromCart(id) }
      ]
    );
  };

  // Merender setiap item dalam keranjang
  const renderCartItem = ({ item }) => (
    // Item keranjang
    <View style={cartScreenStyles.cartItem}>
      {/* Gambar produk */}
      <Image source={item.image} style={cartScreenStyles.itemImage} resizeMode="cover" />
      <View style={cartScreenStyles.itemDetails}>
        {/* Nama produk dengan variasi gaya standard */}
        <ThemeText variant="productName" style={cartScreenStyles.itemName}>
          {item.name}
        </ThemeText>

        {/* Harga produk dan kontrol kuantitas */}
        <ThemeText variant="productName" style={{ color: theme.colors.accent, fontWeight: 'bold', fontFamily: 'Poppins-Bold' }}>
          {formatPrice(item.price)}
        </ThemeText>

        {/* Kontrol kuantitas */}
        <View style={cartScreenStyles.quantityContainer}>
          <TouchableOpacity
            style={cartScreenStyles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={20} color={theme.colors.white} />
          </TouchableOpacity>
          <ThemeText variant="productDescription" style={{ color: theme.colors.black, textAlign: 'center', minWidth: 30 }}>
            {item.quantity}
          </ThemeText>
          <TouchableOpacity
            style={cartScreenStyles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Tombol hapus item dari keranjang */}
      <TouchableOpacity
        style={cartScreenStyles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color={theme.colors.gray} />
      </TouchableOpacity>
    </View>
  );
  // Merender tampilan ketika keranjang kosong
  const renderEmptyCart = () => (
    // Tampilan keranjang kosong
    <View style={cartScreenStyles.emptyContainer}>
      <Ionicons name="cart-outline" size={100} color={theme.colors.gray} />
      <ThemeText variant="sectionTitle" style={{ color: theme.colors.black, marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm }}>
        Your cart is empty
      </ThemeText>
      <ThemeText variant="description" style={{ color: theme.colors.gray, textAlign: 'center', marginBottom: theme.spacing.xl }}>
        Start adding delicious desserts to your cart
      </ThemeText>
      {/* Tombol untuk menavigasi ke layar katalog */}
      <ButtonPrimary
        title="BROWSE COLLECTION"
        onPress={() => navigation.navigate('Catalog')}
        style={cartScreenStyles.browseButton}
      />
    </View>
  );
  // Struktur utama layar keranjang
  return (
    // Kontainer utama
    <View style={cartScreenStyles.container}>
      {/* Header dengan tombol kembali dan ikon keranjang */}
      <StatusBar barStyle="dark-content" />
      <View style={cartScreenStyles.header}>
        <TouchableOpacity
          style={cartScreenStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <ThemeText variant="sectionTitle" style={{ fontSize: theme.fontSizes.xl }}>Shopping Cart</ThemeText>
        <View style={cartScreenStyles.cartIcon}>
          {/* Ikon keranjang dengan badge jumlah item */}
          <Ionicons name="cart-outline" size={24} color={theme.colors.black} />
          {cartItems.length > 0 && (
            <View style={cartScreenStyles.cartBadge}>
              <ThemeText variant="productDescription" style={{ color: theme.colors.white, fontSize: theme.fontSizes.xs }}>
                {cartItems.length}
              </ThemeText>
            </View>
          )}
        </View>
      </View>
      {/* Menampilkan isi keranjang atau tampilan kosong */}
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>{/* Daftar item dalam keranjang */}
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={cartScreenStyles.listContent}
            showsVerticalScrollIndicator={false}
          />
          {/* Footer dengan total harga dan tombol checkout */}
          <View style={cartScreenStyles.footer}>
            {/* Total harga */}
            <View style={cartScreenStyles.totalContainer}>
              <ThemeText variant="navbarTitle" style={{ color: theme.colors.black, textAlign: 'left' }}>Total</ThemeText>
              <ThemeText variant="productName" style={{ color: theme.colors.accent, fontWeight: 'bold', fontFamily: 'Poppins-Bold' }}>
                {formatPrice(getTotalPrice())}
              </ThemeText>
            </View>

            {/* Tombol checkout */}
            {isProcessing ? (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
              <ButtonPrimary
                title="PROCEED TO CHECKOUT"
                onPress={handleCheckout}
                variant="secondary"
                style={cartScreenStyles.checkoutButton}
              />
            )}

          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
