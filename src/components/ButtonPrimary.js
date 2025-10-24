import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

//Array yang nyatuin semua kemungkinan style:
const ButtonPrimary = ({ title, onPress, style, variant = 'primary', disabled = false }) => {
  const buttonStyle = [
    styles.baseButton,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style,
  ];

  //Sama persis tapi buat warna teks-nya:
  const textStyle = [
    styles.baseText,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
  ];

  //⚡ Event handling
  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={disabled ? 1 : 0.8} disabled={disabled}>
        <LinearGradient
          colors={disabled ? [theme.colors.gray, theme.colors.gray] : [theme.colors.primary, theme.colors.darkPink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={buttonStyle}
        >
          <Text style={textStyle}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={disabled ? 1 : 0.8} disabled={disabled} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  primaryButton: {
    // Gradient handled in component
  },
  secondaryButton: {
    backgroundColor: theme.colors.accent,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.6,
    ...theme.shadows.small,
  },
  baseText: {
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  disabledText: {
    color: theme.colors.lightGray,
  },
});

export default ButtonPrimary;
