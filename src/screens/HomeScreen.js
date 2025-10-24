import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemeText from '../components/atoms/ThemeText';
import { theme } from '../theme/theme';

const TemplateScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <ThemeText variant="sectionTitle" style={styles.title}>
            Template Screen
          </ThemeText>
          <ThemeText variant="description" style={styles.subtitle}>
            Screen template kosong - siap diisi konten
          </ThemeText>
          {/* TODO: Add your content here */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.gray,
    textAlign: 'center',
  },
});

export default TemplateScreen;
