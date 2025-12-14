import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import ThemeText from './atoms/ThemeText';
import { theme } from '../theme/theme';

// Mendapatkan lebar layar untuk animasi sidebar
const { width } = Dimensions.get('window');

// Komponen Navbar dengan sidebar animasi
const Navbar = ({ navigation }) => {
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current; // Start off-screen to the left

  // Fungsi untuk membuka dan menutup sidebar dengan animasi
  const toggleSidebar = () => {
    if (sidebarOpen) {
      // Close: slide out to the left
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarOpen(false));
    } else {
      setSidebarOpen(true);
      // Open: slide in from the left
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Menu items untuk sidebar
  const menuItems = [
    { name: 'Home', icon: 'home-outline', screen: 'Home' },
    { name: 'Dashboard', icon: 'bar-chart-outline', screen: 'Dashboard' },
    { name: 'About Us', icon: 'information-circle-outline', screen: 'About' },
    { name: 'Cart', icon: 'cart-outline', screen: 'Cart' },
    { name: 'Admin Panel', icon: 'settings-outline', screen: 'AdminProductList' }, // Menu Admin Baru
  ];

  return (
    <>
      {/*Navbar dengan LinearGradient*/}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.darkPink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.navbar}
      >{/*Tombol menu untuk membuka sidebar*/}
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
          <View style={styles.iconContainer}>
            <Ionicons name="menu" size={22} color={theme.colors.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <ThemeText variant="navbarTitle" style={styles.titleTop}>Kremé</ThemeText>
          <ThemeText variant="navbarTitle" style={styles.titleBottom}>Dessert House</ThemeText>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
          <View style={styles.iconContainer}>
            <Ionicons name="cart-outline" size={22} color={theme.colors.white} />
          </View>
          {getTotalItems() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>

      {/* Sidebar */}
      {sidebarOpen && (
        <Modal
          visible={sidebarOpen}
          animationType="none" // Disable default animation
          transparent={true}
          onRequestClose={toggleSidebar}
        >{/*Overlay untuk menutup sidebar saat ditekan di luar*/}
          <TouchableOpacity style={styles.sidebarOverlay} onPress={toggleSidebar} activeOpacity={1}>
            <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX: slideAnim }] }]}>
              <View style={styles.sidebar}>
                <View style={styles.sidebarHeader}>
                  <View style={styles.sidebarHeaderPattern} />
                  <View style={styles.sidebarTitleContainer}>
                    <Ionicons name="storefront-outline" size={28} color={theme.colors.white} />
                    <View style={styles.sidebarBrandContainer}>
                      <ThemeText variant="productName" style={styles.sidebarBrandTop}>Kremé</ThemeText>
                      <ThemeText variant="productName" style={styles.sidebarBrandBottom}>Dessert House</ThemeText>
                    </View>
                  </View>
                  <View style={styles.sidebarDivider} />
                </View>

                {/* User Info - Clickable to Open Profile */}
                {isAuthenticated && user && (
                  <TouchableOpacity
                    style={styles.userInfoContainer}
                    onPress={() => {
                      navigation.navigate('Profile');
                      toggleSidebar();
                    }}
                  >
                    <View style={styles.userAvatar}>
                      <Ionicons name="person" size={24} color={theme.colors.primary} />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>{user.full_name || 'User'}</Text>
                      <Text style={styles.userEmail}>{user.email}</Text>
                      <Text style={{ fontSize: 10, color: theme.colors.primary, marginTop: 4 }}>
                        Tap to view profile
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.gray} />
                  </TouchableOpacity>
                )}

                {/* Menu Items */}
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => {
                      navigation.navigate(item.screen);
                      toggleSidebar();
                    }}
                  >
                    <View style={styles.menuIconContainer}>
                      <Ionicons name={item.icon} size={24} color={theme.colors.primary} />
                    </View>
                    <View style={[styles.textWithUnderline, { flex: 1 }]}>
                      <ThemeText variant="productDescription" style={styles.menuText}>{item.name}</ThemeText>
                      <View style={styles.underline} />
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    ...theme.shadows.medium,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  menuButton: {
    padding: theme.spacing.xs,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xs,
    ...theme.shadows.small,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,

  },
  titleTop: {
    fontSize: theme.fontSizes.lg + 2,
    fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: 'bold',
    color: theme.colors.white,
    letterSpacing: 1.5,
    textAlign: 'center',
    lineHeight: theme.fontSizes.lg + 2,
  },
  titleBottom: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: 'bold',
    color: theme.colors.white,
    letterSpacing: 1.5,
    textAlign: 'center',
    lineHeight: theme.fontSizes.md,
  },
  titleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: theme.colors.accent,
    borderRadius: 1,
    marginTop: 4,
  },
  cartButton: {
    padding: theme.spacing.xs,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.sm,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  cartBadgeText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.xs,
    fontWeight: 'bold',
  },
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sidebarContainer: {
    width: width * 0.7,
    height: '100%',
    borderTopRightRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.large,
  },
  sidebar: {
    flex: 1,
    borderTopRightRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.white,
  },
  sidebarHeader: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    position: 'relative',
  },
  sidebarHeaderPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.5) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(255, 218, 185, 0.5) 1px, transparent 1px)',
    backgroundSize: '30px 30px',
  },
  sidebarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  sidebarTitle: {
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.heading,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginLeft: theme.spacing.md,
  },
  sidebarBrandContainer: {
    marginLeft: theme.spacing.md,
  },
  sidebarBrandTop: {
    fontSize: theme.fontSizes.lg,
    fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: 'bold',
    color: theme.colors.white,
    letterSpacing: 1.5,
    lineHeight: theme.fontSizes.lg,
  },
  sidebarBrandBottom: {
    fontSize: theme.fontSizes.sm,
    fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: 'bold',
    color: theme.colors.secondary,
    letterSpacing: 1.5,
    lineHeight: theme.fontSizes.sm,
  },
  sidebarDivider: {
    width: '80%',
    height: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  menuText: {
    fontSize: theme.fontSizes.md + 1,
    fontFamily: 'PlayfairDisplay-Bold',
    color: theme.colors.primary,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  underline: {
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
    marginTop: theme.spacing.xs,
  },
  textWithUnderline: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.quaternary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    ...theme.shadows.small,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.xs / 2,
  },
  userEmail: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray,
  },
});


export default Navbar;
