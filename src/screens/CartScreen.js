import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import ButtonPrimary from '../components/ButtonPrimary';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';

//  Komponen layar Keranjang Belanja
const CartScreen = ({ navigation }) => {
  // Mengakses konteks keranjang belanja
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  // Format harga dalam bentuk mata uang
  const formatPrice = (price) => {
    // Mengubah angka menjadi format mata uang USD
    return `$${price.toLocaleString('en-US')}`;
  };
  // Merender setiap item dalam keranjang
  const renderCartItem = ({ item }) => (
    // Item keranjang
    <View style={styles.cartItem}>
      {/* Gambar produk */}
      <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemDetails}>
        {/* Nama produk dengan variasi gaya berdasarkan nama atau kategori */}        
        <ThemeText
          variant={
            item.name === 'Matcha Opera Cake' ? 'productNameMatcha' :
            item.name === 'Vanilla Bean Éclair' ? 'productNameEclair' :
            item.name === 'Strawberry Mille-Feuille' ? 'productNameMille' :
            item.category === 'Macarons' ? 'productNameMacarons' :
            item.category === 'Tarts' ? 'productNameTarts' :
            item.category === 'Cakes' ? 'productNameCakes' :
            item.category === 'Pastries' ? 'productNamePastries' :
            item.category === 'Pies' ? 'productNamePies' :
            'productName'
          }
          style={styles.itemName}
        >
          {item.name}
        </ThemeText>
        {/* Harga produk dan kontrol kuantitas */}
        <ThemeText variant="productName" style={{ color: theme.colors.accent, fontWeight: 'bold', fontFamily: 'Poppins-Bold' }}>
          {formatPrice(item.price)}
        </ThemeText>
          {/* Kontrol kuantitas */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={20} color={theme.colors.white} />
          </TouchableOpacity>
          <ThemeText variant="productDescription" style={{ color: theme.colors.black, textAlign: 'center', minWidth: 30 }}>
            {item.quantity}
          </ThemeText>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Tombol hapus item dari keranjang */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color={theme.colors.gray} />
      </TouchableOpacity>
    </View>
  );
  // Merender tampilan ketika keranjang kosong
  const renderEmptyCart = () => (
    // Tampilan keranjang kosong
    <View style={styles.emptyContainer}>
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
        style={styles.browseButton}
      />
    </View>
  );
// Struktur utama layar keranjang
  return (
    // Kontainer utama
    <View style={styles.container}>
      {/* Header dengan tombol kembali dan ikon keranjang */}
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <ThemeText variant="sectionTitle" style={{ fontSize: theme.fontSizes.xl }}>Shopping Cart</ThemeText>
        <View style={styles.cartIcon}>
          {/* Ikon keranjang dengan badge jumlah item */}
          <Ionicons name="cart-outline" size={24} color={theme.colors.black} />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
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
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          {/* Footer dengan total harga dan tombol checkout */}
          <View style={styles.footer}>
            {/* Total harga */}
            <View style={styles.totalContainer}>
              <ThemeText variant="navbarTitle" style={{ color: theme.colors.black, textAlign: 'left' }}>Total</ThemeText>
              <ThemeText variant="productName" style={{ color: theme.colors.accent, fontWeight: 'bold', fontFamily: 'Poppins-Bold' }}>
                {formatPrice(getTotalPrice())}
              </ThemeText>
            </View>
            {/* Tombol checkout */}
            <ButtonPrimary
              title="PROCEED TO CHECKOUT"
              onPress={() => {}}
              variant="secondary"
              style={styles.checkoutButton}
            />
            <ThemeText variant="productDescription" style={{ color: theme.colors.darkgray, textAlign: 'center', marginTop: theme.spacing.sm }}>
              Checkout feature coming soon
            </ThemeText>
          </View>
        </>
      )}
    </View>
  );
};
// Gaya untuk komponen CartScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.medium,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  cartIcon: {
    position: 'relative',
    padding: theme.spacing.sm,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.secondary,
  },
  itemDetails: {
    flex: 1,
    marginLeft: theme.spacing.md,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: theme.colors.black,
    textAlign: 'left',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.black,
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: theme.colors.darkPink,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  removeButton: {
    padding: theme.spacing.sm,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    ...theme.shadows.large,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  checkoutButton: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  browseButton: {
    minWidth: 200,
  },
});

export default CartScreen;
