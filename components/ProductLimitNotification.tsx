import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ProductLimitNotificationProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProductLimitNotification({
  visible,
  onClose,
}: ProductLimitNotificationProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
          {/* Icon */}
          <View className="mb-4 items-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <MaterialIcons name="inventory-2" size={32} color="#F97316" />
            </View>
          </View>

          {/* Title */}
          <Text className="mb-2 text-center text-lg font-bold text-gray-900">
            Product Limit Reached
          </Text>

          {/* Message */}
          <Text className="mb-6 text-center text-sm leading-relaxed text-gray-600">
            You&apos;ve reached the maximum of 5 products.
          </Text>

          {/* Button */}
          <TouchableOpacity
            onPress={onClose}
            className="h-12 w-full items-center justify-center rounded-xl bg-[#4A90E2]">
            <Text className="text-base font-semibold text-white">Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
