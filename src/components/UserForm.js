import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { profileStyles } from '../theme/ProfileStyles';
import { theme } from '../theme/theme';

const UserForm = ({ currentName, onUpdateProfile, loading }) => {
  const [name, setName] = useState(currentName);

  return (
    <View style={profileStyles.formContainer}>
      <Text style={profileStyles.sectionTitle}>Edit Profile</Text>

      {/* Name Input */}
      <View style={profileStyles.inputGroup}>
        <Text style={profileStyles.label}>Full Name</Text>
        <TextInput
          style={profileStyles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          placeholderTextColor={theme.colors.lightGray}
        />
        <TouchableOpacity
          style={[profileStyles.actionButton, { backgroundColor: theme.colors.black }]}
          onPress={() => onUpdateProfile(name)}
          disabled={loading}
        >
          <Text style={profileStyles.actionButtonText}>
            {loading ? 'Updating...' : 'Update Name'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserForm;
