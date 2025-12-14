import React from 'react';
import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemeText from '../components/atoms/ThemeText';
import { templateScreenStyles } from '../theme/TemplateScreenStyles';

const TemplateScreen = ({ navigation }) => {
  return (
    <View style={templateScreenStyles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={templateScreenStyles.scrollContent}>
        <View style={templateScreenStyles.content}>
          <ThemeText variant="sectionTitle" style={templateScreenStyles.title}>
            Template Screen
          </ThemeText>
          <ThemeText variant="description" style={templateScreenStyles.subtitle}>
            Screen template kosong - siap diisi konten
          </ThemeText>
          {/* TODO: Add your content here */}
        </View>
      </ScrollView>
    </View>
  );
};

export default TemplateScreen;
