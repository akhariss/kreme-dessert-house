import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { useSignIn, useSignUp, useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { useAuthContext } from '../context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import { loginScreenStyles } from '../theme/LoginScreenStyles';

// Complete warmup for OAuth
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const { signIn, setActive: setActiveSignIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, setActive: setActiveSignUp, isLoaded: isSignUpLoaded } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { isAuthenticated } = useAuthContext();

  // Auto redirect if already signed in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Home');
    }
  }, [isAuthenticated, navigation]);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  /**
   * Handle Login
   */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Authentication Required', 'Please enter your email and password');
      return;
    }

    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      await setActiveSignIn({ session: result.createdSessionId });
      console.log('✅ Login successful');
    } catch (err) {
      console.error('❌ Login error:', err);
      Alert.alert('Authentication Failed', err.errors?.[0]?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Sign Up
   */
  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Registration Required', 'Please complete all fields');
      return;
    }

    setLoading(true);
    try {
      // Create user
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ').slice(1).join(' ') || '',
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setLoading(false);
      setShowVerification(true);
    } catch (err) {
      console.error('❌ Sign up error:', err);
      Alert.alert('Registration Failed', err.errors?.[0]?.message || 'Unable to create your account. Please try again.');
      setLoading(false);
    }
  };

  /**
   * Handle Verification
   */
  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      Alert.alert('Verification Required', 'Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      await setActiveSignUp({ session: completeSignUp.createdSessionId });
      setShowVerification(false);
      console.log('✅ Sign up successful');
    } catch (err) {
      console.error('❌ Verification error:', err);
      Alert.alert('Verification Failed', 'The code you entered is invalid. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Google Sign In with OAuth
   */
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        console.log('✅ Google sign in successful');
      }
    } catch (err) {
      console.error('❌ OAuth error:', err);
      Alert.alert('Google Sign In Failed', 'Unable to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.secondary, theme.colors.white]}
      style={loginScreenStyles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginScreenStyles.container}
      >
        <ScrollView
          contentContainerStyle={loginScreenStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo/Header */}
          <View style={loginScreenStyles.header}>
            <Text style={loginScreenStyles.title}>Kremé</Text>
            <Text style={loginScreenStyles.subtitle}>Dessert House</Text>
          </View>

          {/* Toggle Login/Register */}
          <View style={loginScreenStyles.toggleContainer}>
            <TouchableOpacity
              style={[loginScreenStyles.toggleButton, isLogin && loginScreenStyles.toggleButtonActive]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[loginScreenStyles.toggleText, isLogin && loginScreenStyles.toggleTextActive]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[loginScreenStyles.toggleButton, !isLogin && loginScreenStyles.toggleButtonActive]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[loginScreenStyles.toggleText, !isLogin && loginScreenStyles.toggleTextActive]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={loginScreenStyles.form}>
            {!isLogin && (
              <View style={loginScreenStyles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={theme.colors.gray}
                  style={loginScreenStyles.inputIcon}
                />
                <TextInput
                  style={loginScreenStyles.input}
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  placeholderTextColor={theme.colors.gray}
                />
              </View>
            )}

            <View style={loginScreenStyles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={theme.colors.gray}
                style={loginScreenStyles.inputIcon}
              />
              <TextInput
                style={loginScreenStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor={theme.colors.gray}
              />
            </View>

            <View style={loginScreenStyles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={theme.colors.gray}
                style={loginScreenStyles.inputIcon}
              />
              <TextInput
                style={loginScreenStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor={theme.colors.gray}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={loginScreenStyles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={theme.colors.gray}
                />
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={loginScreenStyles.submitButton}
              onPress={isLogin ? handleLogin : handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.colors.white} />
              ) : (
                <Text style={loginScreenStyles.submitText}>
                  {isLogin ? 'Login' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={loginScreenStyles.divider}>
              <View style={loginScreenStyles.dividerLine} />
              <Text style={loginScreenStyles.dividerText}>or continue with</Text>
              <View style={loginScreenStyles.dividerLine} />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity
              style={loginScreenStyles.googleButton}
              onPress={handleGoogleSignIn}
              disabled={loading}
            >
              <Ionicons name="logo-google" size={20} color={theme.colors.black} />
              <Text style={loginScreenStyles.googleText}>Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verification Modal */}
      <Modal
        visible={showVerification}
        animationType="slide"
        transparent={true}
      >
        <View style={loginScreenStyles.modalOverlay}>
          <View style={loginScreenStyles.modalContent}>
            <View style={loginScreenStyles.modalHeader}>
              <Text style={loginScreenStyles.modalTitle}>Verify Email</Text>
              <Text style={loginScreenStyles.modalSubtitle}>
                Enter code sent to {email}
              </Text>
            </View>

            <View style={loginScreenStyles.modalBody}>
              <TextInput
                style={loginScreenStyles.codeInput}
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="123456"
                textAlign="center"
              />

              <TouchableOpacity
                style={loginScreenStyles.verifyButton}
                onPress={handleVerifyCode}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={theme.colors.white} />
                ) : (
                  <Text style={loginScreenStyles.submitText}>Verify</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={loginScreenStyles.cancelButton}
                onPress={() => setShowVerification(false)}
              >
                <Text style={loginScreenStyles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default LoginScreen;
