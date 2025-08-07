import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Route = () => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#121212] px-4">
      <View className="pt-6">
        <Text className="text-xl font-semibold text-white text-center">
          🚚 Route Info
        </Text>

        <View className="mt-12 items-center">
          <Text className="text-[#B3B3B3] text-base">
            Live route tracking coming soon.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Route;
