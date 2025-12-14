import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';
import { theme } from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import AboutScreen from '../screens/AboutScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminProductListScreen from '../screens/admin/AdminProductListScreen';
import AdminEditProductScreen from '../screens/admin/AdminEditProductScreen';

// Membuat stack navigator
const Stack = createNativeStackNavigator();

// Komponen navigasi utama
const Navigation = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated, user } = useAuthContext();
  
  // Ikon keranjang dengan badge jumlah item
  const CartIcon = ({ navigation }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.cartIconContainer}
    >
      <Ionicons name="cart-outline" size={28} color={theme.colors.primary} />
      {getTotalItems() > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>
            {getTotalItems()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
  
  // Ikon user/profile
  const UserIcon = ({ navigation }) => (
    <TouchableOpacity
      onPress={() => {
        if (isAuthenticated) {
          navigation.navigate('Profile');
        } else {
          navigation.navigate('Login');
        }
      }}
      style={styles.userIconContainer}
    >
      <Ionicons 
        name={isAuthenticated ? "person" : "person-outline"} 
        size={26} 
        color={isAuthenticated ? theme.colors.accent : theme.colors.primary} 
      />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.white,
            ...theme.shadows.small,
          },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: theme.fontSizes.lg,
            color: theme.colors.black,
          },
          headerShadowVisible: false,
          animation: 'fade',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <UserIcon navigation={navigation} />
                <CartIcon navigation={navigation} />
              </View>
            ),
          })}
        />
        {/* ... existing screens ... */}
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <UserIcon navigation={navigation} />
                <CartIcon navigation={navigation} />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            headerShown: false,
            presentation: 'card',
            animation: 'slide_from_right'
          }}
        />
        
        {/* Admin Screens */}
        <Stack.Screen 
          name="AdminProductList" 
          component={AdminProductListScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminEditProduct" 
          component={AdminEditProductScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// Gaya untuk ikon keranjang, user, dan badge
const styles = StyleSheet.create({
  cartIconContainer: {
    marginRight: theme.spacing.md,
    position: 'relative',
  },
  userIconContainer: {
    marginRight: theme.spacing.lg,
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
});

export default Navigation;
