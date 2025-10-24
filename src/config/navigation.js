import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { theme } from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import AboutScreen from '../screens/AboutScreen';
import DashboardScreen from '../screens/DashboardScreen';

// Membuat stack navigator
const Stack = createNativeStackNavigator();

// Komponen navigasi utama
const Navigation = () => {
  const { getTotalItems } = useCart();
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
  // Struktur navigasi dengan screen dan opsi header
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerRight: () => <CartIcon navigation={navigation} />,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// Gaya untuk ikon keranjang dan badge
const styles = StyleSheet.create({
  cartIconContainer: {
    marginRight: theme.spacing.lg,
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
});

export default Navigation;
