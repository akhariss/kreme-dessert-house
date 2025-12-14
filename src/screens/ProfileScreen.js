import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { profileStyles } from '../theme/ProfileStyles';
import UserForm from '../components/UserForm';
import Navbar from '../components/Navbar';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { profileService } from '../backend/profileService';

const ProfileScreen = ({ navigation }) => {
  const { clerkUser, user: supabaseUser, logout } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // Handle Update Name via Backend Service
  const handleUpdateProfile = async (newName) => {
    if (!newName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      // Panggil Backend Service untuk sync update ke Clerk & Supabase
      await profileService.updateProfile(clerkUser, supabaseUser.id, newName);

      Alert.alert('Success', 'Profile updated successfully in Database!');
    } catch (error) {
      console.error(error);
      const errorMessage = error.errors?.[0]?.message || error.message || 'Failed to update profile';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // Navigation will auto-handle redirect in LoginScreen or Navigation flow
          }
        }
      ]
    );
  };

  if (!clerkUser) return null;

  return (
    <View style={profileStyles.container}>
      <Navbar navigation={navigation} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Section */}
        <View style={profileStyles.header}>
          <View style={profileStyles.avatarContainer}>
            {clerkUser.imageUrl ? (
              <Image
                source={{ uri: clerkUser.imageUrl }}
                style={profileStyles.avatarImage}
              />
            ) : (
              <Ionicons name="person" size={50} color={theme.colors.white} />
            )}
          </View>
          <Text style={profileStyles.userName}>{clerkUser.fullName}</Text>
          <Text style={profileStyles.userEmail}>{clerkUser.primaryEmailAddress?.emailAddress}</Text>
        </View>

        {/* Form Section */}
        <UserForm
          currentName={clerkUser.fullName}
          onUpdateProfile={handleUpdateProfile}
          loading={loading}
        />

        {/* Appreciation & Info Section */}
        <View style={profileStyles.infoContainer}>
          <Ionicons name="heart" size={24} color={theme.colors.darkPink} style={{ marginBottom: 8 }} />
          <Text style={profileStyles.appTagline}>"Thank you for being the sweetest part of our journey."</Text>
          <Text style={profileStyles.appVersion}>Kremé Dessert House v1.0.0</Text>
          <Text style={profileStyles.copyright}>© 2025 Kremé Inc. All rights reserved.</Text>
        </View>

        {/* Footer Section */}
        <View style={profileStyles.footerContainer}>
          <TouchableOpacity
            style={profileStyles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={profileStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
