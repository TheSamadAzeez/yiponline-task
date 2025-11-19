import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product, searchProducts } from '../services/database';
import { useProductStore, MAX_PRODUCTS } from '../store/productStore';
import ProductLimitNotification from '../components/ProductLimitNotification';

export default function Index() {
  const {
    products,
    productCount,
    loading,
    refreshing,
    isAtMaxLimit,
    initializeStore,
    refreshProducts,
  } = useProductStore();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLimitNotification, setShowLimitNotification] = useState(false);

  const initializeApp = useCallback(async () => {
    try {
      await initializeStore();
      setFilteredProducts(products);
    } catch (error) {
      console.error('Error initializing app:', error);
      Alert.alert('Error', 'Failed to initialize database');
    }
  }, [initializeStore]);

  // Initialize store on mount
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  // Update filtered products when products change
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  const handleSearch = async (text: string) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      setFilteredProducts(products);
    } else {
      try {
        const results = await searchProducts(text);
        setFilteredProducts(results);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    }
  };

  const onRefresh = () => {
    refreshProducts();
  };

  const handleAddProductPress = () => {
    if (isAtMaxLimit) {
      setShowLimitNotification(true);
    } else {
      router.push('/add-product');
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => router.push(`/details?id=${item.id}`)}
      className="mb-3 flex-row items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm">
      <View className="flex-1 flex-row items-center gap-4">
        {item.imageUri ? (
          <Image
            source={{ uri: item.imageUri }}
            className="h-[70px] w-[70px] rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="h-[70px] w-[70px] items-center justify-center rounded-lg bg-gray-200">
            <MaterialIcons name="inventory-2" size={32} color="#9CA3AF" />
          </View>
        )}
        <View className="flex-1 justify-center">
          <Text className="text-base font-medium text-gray-900" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-sm text-gray-600">Price: ₦{item.price.toFixed(2)}/unit</Text>
          <Text className="text-sm text-gray-600">Quantity: {item.quantity} units</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/details?id=${item.id}`)}
        className="flex h-9 w-9 items-center justify-center rounded-full">
        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="mt-4 flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12">
      <MaterialIcons name="inventory-2" size={64} color="#9CA3AF" />
      <Text className="mt-4 text-lg font-medium text-gray-900">No products yet.</Text>
      <Text className="mt-1 text-center text-sm text-gray-600">
        Tap the &apos;+&apos; button to add your first item.
      </Text>
    </View>
  );

  if (loading && products.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Top App Bar */}
      <View className="bg-[#4A90E2] px-4 py-6 shadow-md">
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-white">Inventory</Text>
          <View className="flex-row items-center gap-2">
            <View className="rounded-full bg-white/20 px-3 py-1">
              <Text className="text-sm font-semibold text-white">
                {productCount} / {MAX_PRODUCTS} Products Added
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View className="bg-white px-4 py-3">
        <View className="h-12 w-full flex-row items-center rounded-lg bg-gray-100">
          <View className="pl-4 pr-2">
            <Ionicons name="search" size={20} color="#9CA3AF" />
          </View>
          <TextInput
            className="h-full flex-1 pr-4 text-base text-gray-900"
            placeholder="Search by product name..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListEmptyComponent={renderEmptyState}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={handleAddProductPress}
        className={`absolute bottom-16 right-6 h-14 w-14 items-center justify-center rounded-full shadow-lg ${
          isAtMaxLimit ? 'bg-gray-400' : 'bg-[#4A90E2]'
        }`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Product Limit Notification */}
      <ProductLimitNotification
        visible={showLimitNotification}
        onClose={() => setShowLimitNotification(false)}
      />
    </SafeAreaView>
  );
}
