import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { getProductById, updateProduct } from '../services/database';

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImageUri, setEditImageUri] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      const productData = await getProductById(Number(id));
      if (productData) {
        setEditName(productData.name);
        setEditQuantity(productData.quantity.toString());
        setEditPrice(productData.price.toString());
        setEditImageUri(productData.imageUri || null);
      } else {
        Alert.alert('Error', 'Product not found', [{ text: 'OK', onPress: () => router.back() }]);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
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
      setEditImageUri(result.assets[0].uri);
    }
  };

  const validateEditForm = () => {
    if (!editName.trim()) {
      Alert.alert('Validation Error', 'Please enter a product name.');
      return false;
    }
    if (!editQuantity.trim() || isNaN(Number(editQuantity)) || Number(editQuantity) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid quantity.');
      return false;
    }
    if (!editPrice.trim() || isNaN(Number(editPrice)) || Number(editPrice) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid price.');
      return false;
    }
    return true;
  };

  const handleSaveEdit = async () => {
    if (!validateEditForm()) {
      return;
    }

    try {
      setSaving(true);
      await updateProduct(Number(id), {
        name: editName.trim(),
        quantity: Number(editQuantity),
        price: Number(editPrice),
        imageUri: editImageUri || undefined,
      });

      Alert.alert('Success', 'Product updated successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center bg-gray-50">
          <ActivityIndicator size="large" color="#1173d4" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-gray-50">
        {/* Modal Header */}
        <View className="border-b border-gray-200 bg-gray-50 px-4 pb-2 pt-12">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center">
              <Ionicons name="close" size={24} color="#1C1C1E" />
            </TouchableOpacity>
            <Text className="flex-1 text-center text-lg font-bold text-gray-900">Edit Product</Text>
            <View className="h-10 w-10" />
          </View>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Image Uploader */}
          <View className="p-4">
            <TouchableOpacity
              onPress={handleImagePicker}
              className="flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gray-300 px-6 py-10">
              {editImageUri ? (
                <Image
                  source={{ uri: editImageUri }}
                  className="h-32 w-32 rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <MaterialIcons name="add-a-photo" size={28} color="#9CA3AF" />
                </View>
              )}
              <View className="h-10 min-w-[84px] items-center justify-center rounded-lg bg-gray-200 px-5">
                <Text className="text-sm font-bold text-gray-900">
                  {editImageUri ? 'Change Image' : 'Add Image'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="flex-col gap-4 px-4">
            {/* Product Name */}
            <View className="w-full flex-col">
              <Text className="pb-2 text-base font-medium text-gray-800">Product Name</Text>
              <TextInput
                className="h-14 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900"
                value={editName}
                onChangeText={setEditName}
              />
            </View>

            <View className="flex-row gap-4">
              {/* Quantity */}
              <View className="flex-1 flex-col">
                <Text className="pb-2 text-base font-medium text-gray-800">Quantity</Text>
                <TextInput
                  className="h-14 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900"
                  keyboardType="numeric"
                  value={editQuantity}
                  onChangeText={setEditQuantity}
                />
              </View>

              {/* Price */}
              <View className="flex-1 flex-col">
                <Text className="pb-2 text-base font-medium text-gray-800">Price</Text>
                <TextInput
                  className="h-14 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900"
                  keyboardType="decimal-pad"
                  value={editPrice}
                  onChangeText={setEditPrice}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View className="absolute bottom-0 w-full border-t border-gray-200 bg-gray-50 p-4">
          <TouchableOpacity
            onPress={handleSaveEdit}
            disabled={saving}
            className="h-14 w-full items-center justify-center rounded-xl bg-[#1173d4] px-6"
            style={{ opacity: saving ? 0.6 : 1 }}>
            <Text className="text-base font-bold text-white">
              {saving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
