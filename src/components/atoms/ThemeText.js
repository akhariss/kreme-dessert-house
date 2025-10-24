import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

const ThemeText = ({ variant, style, children, ...props }) => {
  const textStyle = [
    styles.base,
    // Style berdasarkan variant yang diminta
    variant === 'brandName' && styles.brandName,
    variant === 'subtitle' && styles.subtitle,
    variant === 'tagline' && styles.tagline,
    variant === 'description' && styles.description,
    variant === 'sectionTitle' && styles.sectionTitle,
    variant === 'productName' && styles.productName,
    variant === 'productDescription' && styles.productDescription,
    variant === 'navbarTitle' && styles.navbarTitle,
    variant === 'heroDescription' && styles.heroDescription,
    variant === 'productNameMacarons' && styles.productNameMacarons,
    variant === 'productNameTarts' && styles.productNameTarts,
    variant === 'productNameCakes' && styles.productNameCakes,
    variant === 'productNamePastries' && styles.productNamePastries,
    variant === 'productNamePies' && styles.productNamePies,
    variant === 'productNameMatcha' && styles.productNameMatcha,
    variant === 'productNameEclair' && styles.productNameEclair,
    variant === 'productNameMille' && styles.productNameMille,

    // Menerima style override dari props (yang spesifik di HomeScreen)
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: theme.colors.white,
    // Default font family will be set in theme
  },
  brandName: {
    fontSize: theme.fontSizes.xxxl + 20,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  subtitle: {
    fontSize: theme.fontSizes.xl,
    fontFamily: 'PlayfairDisplay-Regular',
    fontWeight: 'normal',
  },
  tagline: {
    fontSize: theme.fontSizes.lg,
    fontFamily: 'PlayfairDisplay-Italic',
    fontWeight: 'normal',
    letterSpacing: 2,
  },
  description: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: 28,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: theme.fontSizes.xxl,
    fontFamily: 'PlayfairDisplay-Bold',
    textAlign: 'center',
    color: theme.colors.black,
  },
  productName: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: theme.colors.accent,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: theme.fontSizes.xs,
    fontFamily: 'PlayfairDisplay-bold',
    fontStyle: 'bold',
    color: theme.colors.darkgray,
    textAlign: 'center',
  },
  navbarTitle: {
    fontSize: theme.fontSizes.lg,
    fontFamily: 'PlayfairDisplay-Bold',
    color: theme.colors.black,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: 20,
    textAlign: 'center',
    color: theme.colors.gray,
  },
  productNameMacarons: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: theme.colors.darkPink,
    textAlign: 'center',
  },
  productNameTarts: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: theme.colors.warning,
    textAlign: 'center',
  },
  productNameCakes: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: '#8B4513', // Brown color for cakes
    textAlign: 'center',
  },
  productNamePastries: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: '#DAA520', // Golden wheat color for choux
    textAlign: 'center',
  },
  productNamePies: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: '#ffb004ff', // Lemon yellow for pies
    textAlign: 'center',
  },
  productNameMatcha: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: '#4F6A32', // Matcha green
    textAlign: 'center',
  },
  productNameEclair: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: '#ff9831ff', // Bread brown for eclair
    textAlign: 'center',
  },
  productNameMille: {
    fontSize: theme.fontSizes.md,
    fontFamily: 'PlayfairDisplay-Medium',
    color: theme.colors.warning, // Warning color for mille-feuille
    textAlign: 'center',
  },
});

export default ThemeText;
