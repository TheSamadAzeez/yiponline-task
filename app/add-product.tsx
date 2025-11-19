import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductStore } from '../store/productStore';
import ProductLimitNotification from '../components/ProductLimitNotification';

export default function AddProduct() {
  const { createProduct, checkProductLimit } = useProductStore();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLimitNotification, setShowLimitNotification] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    return { cameraStatus, mediaStatus };
  };

  const handleTakePhoto = async () => {
    const { cameraStatus } = await requestPermissions();

    if (cameraStatus !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleChooseFromGallery = async () => {
    const { mediaStatus } = await requestPermissions();

    if (mediaStatus !== 'granted') {
      Alert.alert('Permission Required', 'Gallery permission is required to choose photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Add Product Image',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: handleTakePhoto,
        },
        {
          text: 'Choose from Gallery',
          onPress: handleChooseFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a product name.');
      return false;
    }
    if (!quantity.trim() || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid quantity.');
      return false;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid price.');
      return false;
    }
    return true;
  };

  const handleSaveProduct = async () => {
    if (!validateForm()) {
      return;
    }

    // Check product limit before creating
    if (checkProductLimit()) {
      setShowLimitNotification(true);
      return;
    }

    try {
      setLoading(true);
      const success = await createProduct({
        name: name.trim(),
        quantity: Number(quantity),
        price: Number(price),
        imageUri: imageUri || undefined,
      });

      if (success) {
        Alert.alert('Success', 'Product added successfully!', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      } else {
        setShowLimitNotification(true);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-gray-50">
        {/* Top App Bar */}
        <View className="border-b border-gray-200 bg-gray-50 px-4 pb-2 pt-12">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center">
              <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
            </TouchableOpacity>
            <Text className="flex-1 text-center text-lg font-bold text-gray-900">
              Add New Product
            </Text>
            <View className="h-10 w-10" />
          </View>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Image Uploader */}
          <View className="p-4">
            <TouchableOpacity
              onPress={showImageOptions}
              className="flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gray-300 px-6 py-10">
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  className="h-32 w-32 rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <>
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <MaterialIcons name="add-a-photo" size={28} color="#9CA3AF" />
                  </View>
                  <View className="flex-col items-center gap-1">
                    <Text className="text-base font-bold text-gray-900">Add Product Image</Text>
                    <Text className="max-w-[480px] text-center text-sm text-gray-600">
                      Upload an image from your camera or gallery (Optional).
                    </Text>
                  </View>
                </>
              )}
              <View className="h-10 min-w-[84px] max-w-[480px] items-center justify-center rounded-lg bg-gray-200 px-5">
                <Text className="text-sm font-bold text-gray-900">
                  {imageUri ? 'Change Image' : 'Add Image'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="flex-col gap-4 px-4">
            {/* Product Name TextField */}
            <View className="w-full flex-col">
              <Text className="pb-2 text-base font-medium text-gray-800">Product Name</Text>
              <TextInput
                className="h-14 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900"
                placeholder="e.g., Organic Apples"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="flex-row gap-4">
              {/* Quantity TextField */}
              <View className="flex-1 flex-col">
                <Text className="pb-2 text-base font-medium text-gray-800">Quantity</Text>
                <TextInput
                  className="h-14 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900"
                  placeholder="e.g., 25"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>

              {/* Price TextField */}
              <View className="flex-1 flex-col">
                <Text className="pb-2 text-base font-medium text-gray-800">Price</Text>
                <TextInput
                  className="h-14 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900"
                  placeholder="e.g., 1.99"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="decimal-pad"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom CTA Button */}
        <View className="absolute bottom-0 w-full border-t border-gray-200 bg-gray-50 p-4">
          <TouchableOpacity
            onPress={handleSaveProduct}
            disabled={loading}
            className="h-14 w-full items-center justify-center rounded-xl bg-[#1173d4] px-6"
            style={{
              opacity: loading ? 0.6 : 1,
            }}>
            <Text className="text-base font-bold text-white">
              {loading ? 'Saving...' : 'Save Product'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Product Limit Notification */}
        <ProductLimitNotification
          visible={showLimitNotification}
          onClose={() => setShowLimitNotification(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
