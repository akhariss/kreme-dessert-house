import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ThemeText from './atoms/ThemeText';
import { theme } from '../theme/theme';

const ProductCard = ({ product, onPress }) => {
  const formatPrice = (price) => {
    return `$${price.toLocaleString('en-US')}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.infoContainer}>
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
          style={styles.name}
          numberOfLines={2}
        >
          {product.name}
        </ThemeText>
        <ThemeText variant="productDescription" style={styles.category}>{product.category}</ThemeText>
        <ThemeText variant="productName" style={{ color: theme.colors.accent, fontWeight: 'bold', fontFamily: 'Poppins-Bold', textAlign: 'center' }}>
          {formatPrice(product.price)}
        </ThemeText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.sm,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: theme.colors.secondary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: theme.spacing.md,
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
  category: {
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

});

export default ProductCard;  