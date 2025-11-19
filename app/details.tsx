import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product, getProductById } from '../services/database';
import { useProductStore } from '../store/productStore';

export default function Details() {
  const { id } = useLocalSearchParams();
  const { deleteProduct } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      const productData = await getProductById(Number(id));
      if (productData) {
        setProduct(productData);
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

  const handleDelete = () => {
    Alert.alert(
      'Delete Product?',
      'Are you sure you want to delete this product? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(Number(id));
              Alert.alert('Success', 'Product deleted successfully', [
                {
                  text: 'OK',
                  onPress: () => router.back(),
                },
              ]);
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete product');
            }
          },
        },
      ]
    );
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

  if (!product) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center bg-gray-50">
          <Text className="text-gray-600">Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Top App Bar */}
      <View className="bg-gray-50 px-4 pb-2">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-12 w-12 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text className="flex-1 pr-12 text-center text-lg font-bold text-gray-900">
            Product Details
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Header Image */}
        <View className="px-4 pt-2">
          {product.imageUri ? (
            <Image
              source={{ uri: product.imageUri }}
              className="h-80 w-full rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <View className="h-80 w-full items-center justify-center rounded-xl bg-gray-200">
              <MaterialIcons name="inventory-2" size={80} color="#9CA3AF" />
            </View>
          )}
        </View>

        {/* Description List */}
        <View className="flex-col p-4">
          <View className="flex-row justify-between border-t border-gray-300 py-5">
            <Text className="w-[35%] text-sm text-gray-600">Product Name</Text>
            <Text className="flex-1 text-sm font-medium text-gray-900">{product.name}</Text>
          </View>

          <View className="flex-row justify-between border-t border-gray-300 py-5">
            <Text className="w-[35%] text-sm text-gray-600">Stock Quantity</Text>
            <Text className="flex-1 text-sm font-medium text-gray-900">{product.quantity}</Text>
          </View>

          <View className="flex-row justify-between border-t border-gray-300 py-5">
            <Text className="w-[35%] text-sm text-gray-600">Price per Unit</Text>
            <Text className="flex-1 text-sm font-medium text-gray-900">
              ₦{product.price.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between border-b border-t border-gray-300 py-5">
            <Text className="w-[35%] text-sm text-gray-600">Last Updated</Text>
            <Text className="flex-1 text-sm font-medium text-gray-900">
              {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Button Group */}
      <View className="bg-gray-50 py-4">
        <View className="flex-col gap-3 px-4">
          <TouchableOpacity
            onPress={() => router.push(`/edit-product?id=${id}`)}
            className="h-12 w-full items-center justify-center rounded-xl bg-[#1173d4] px-5">
            <Text className="text-base font-bold text-white">Edit Product</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="h-12 w-full items-center justify-center rounded-xl border border-red-500 bg-transparent px-5">
            <Text className="text-base font-bold text-red-500">Delete Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
