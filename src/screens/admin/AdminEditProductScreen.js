import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import ThemeText from '../../components/atoms/ThemeText';
import ButtonPrimary from '../../components/ButtonPrimary';
import { theme } from '../../theme/theme';
import { productService } from '../../backend/productService';
import { useProducts } from '../../context/ProductContext';
import { adminEditProductScreenStyles as styles } from '../../theme/AdminEditProductScreenStyles';

/*
 * ADMIN: Edit/Create Product Screen
 * Form untuk menambah atau mengubah data produk
 */
const AdminEditProductScreen = ({ route, navigation }) => {
  const { product } = route.params || {}; // Jika ada, berarti Edit Mode
  const isEditMode = !!product;

  const { refreshProducts } = useProducts();
  const [loading, setLoading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Local URI for preview

  // Form State
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price ? product.price.toString() : '',
    category: product?.category || '',
    description: product?.description || '',
    imageUrl: product?.originalImage || '', // Gunakan original URL dari DB
    ingredients: '',
    allergens: '',
    storage: ''
  });

  // Fetch Full Details if Edit Mode (Ingredients etc)
  useEffect(() => {
    if (isEditMode) {
      const loadDetails = async () => {
        setFetchingDetails(true);
        try {
          const fullData = await productService.getProductById(product.id);
          // Handle object vs array response
          let details = null;
          if (Array.isArray(fullData?.product_details)) {
            details = fullData.product_details[0];
          } else if (fullData?.product_details) {
            details = fullData.product_details;
          }

          if (details) {
            setFormData(prev => ({
              ...prev,
              ingredients: details.ingredients || '',
              allergens: details.allergen_information || '',
              storage: details.storage_care || ''
            }));
          }
        } catch (error) {
          console.error("Failed to load details for edit:", error);
        } finally {
          setFetchingDetails(false);
        }
      };
      loadDetails();
    }
  }, [product?.id]);

  // Handle Input Change
  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Handle Pick Image
  const pickImage = async () => {
    // Request Permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for consistent catalogue
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // Clear URL manual kalau user pilih gambar baru untuk memprioritaskan upload
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  // Handle Save
  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      Alert.alert("Validation Error", "Name, Price, and Category are required.");
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = formData.imageUrl; // Default: URL lama/manual

      // 1. Upload Image jika ada selectedImage baru
      if (selectedImage) {
        try {
          const uploadedUrl = await productService.uploadProductImage(selectedImage);
          if (uploadedUrl) {
            finalImageUrl = uploadedUrl;
          }
        } catch (uploadError) {
          Alert.alert("Upload Failed", "Could not upload image. Using default.");
          console.error(uploadError);
        }
      }

      // 2. Prepare Payload
      const payload = { ...formData, imageUrl: finalImageUrl };

      // 3. Save Product
      let result;
      if (isEditMode) {
        result = await productService.updateProduct(product.id, payload);
      } else {
        result = await productService.createProduct(payload);
      }

      if (result.success) {
        await refreshProducts(); // Sync global list
        Alert.alert(
          "Success",
          `Product ${isEditMode ? 'updated' : 'created'} successfully!`,
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        throw new Error(result.error?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Save failed:", error);
      Alert.alert("Error", error.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <ThemeText variant="sectionTitle">
          {isEditMode ? 'Edit Product' : 'New Product'}
        </ThemeText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Image Section */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <TouchableOpacity onPress={pickImage}>
            {selectedImage || formData.imageUrl ? (
              <Image
                source={{ uri: selectedImage || formData.imageUrl }}
                style={{ width: 120, height: 120, borderRadius: 12, backgroundColor: '#eee' }}
              />
            ) : (
              <View style={{ width: 120, height: 120, borderRadius: 12, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="camera-outline" size={40} color={theme.colors.gray} />
                <ThemeText style={{ fontSize: 12, color: theme.colors.gray, marginTop: 4 }}>Add Photo</ThemeText>
              </View>
            )}
          </TouchableOpacity>
          <ThemeText style={{ fontSize: 12, color: theme.colors.primary, marginTop: 8 }}>
            Tap to change image
          </ThemeText>
        </View>

        {/* Basic Info Section */}
        <ThemeText variant="productName" style={styles.sectionHeader}>Basic Info</ThemeText>

        <View style={styles.inputGroup}>
          <ThemeText style={styles.label}>Product Name *</ThemeText>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(t) => handleChange('name', t)}
            placeholder="e.g. Red Velvet Cake"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.flex1, styles.marginRight8]}>
            <ThemeText style={styles.label}>Price (USD) *</ThemeText>
            <TextInput
              style={styles.input}
              value={formData.price}
              onChangeText={(t) => handleChange('price', t)}
              keyboardType="numeric"
              placeholder="0.00"
            />
          </View>
          <View style={[styles.inputGroup, styles.flex1, styles.marginLeft8]}>
            <ThemeText style={styles.label}>Category *</ThemeText>
            <TextInput
              style={styles.input}
              value={formData.category}
              onChangeText={(t) => handleChange('category', t)}
              placeholder="Cakes, Tarts..."
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemeText style={styles.label}>Description</ThemeText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(t) => handleChange('description', t)}
            multiline
            numberOfLines={4}
            placeholder="Describe the deliciousness..."
          />
        </View>

        {/* Details Section */}
        <ThemeText variant="productName" style={[styles.sectionHeader, { marginTop: 24 }]}>
          Details & Ingredients
        </ThemeText>

        {fetchingDetails ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <>
            <View style={styles.inputGroup}>
              <ThemeText style={styles.label}>Ingredients</ThemeText>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.ingredients}
                onChangeText={(t) => handleChange('ingredients', t)}
                multiline
                placeholder="Flour, Sugar, Eggs..."
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemeText style={styles.label}>Allergens</ThemeText>
              <TextInput
                style={styles.input}
                value={formData.allergens}
                onChangeText={(t) => handleChange('allergens', t)}
                placeholder="Contains: Eggs, Dairy..."
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemeText style={styles.label}>Storage & Care</ThemeText>
              <TextInput
                style={styles.input}
                value={formData.storage}
                onChangeText={(t) => handleChange('storage', t)}
                placeholder="Keep refrigerated..."
              />
            </View>
          </>
        )}

        <View style={styles.footer}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <ButtonPrimary
              title={isEditMode ? "UPDATE PRODUCT" : "CREATE PRODUCT"}
              onPress={handleSave}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default AdminEditProductScreen;
