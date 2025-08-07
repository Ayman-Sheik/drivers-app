import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const Messages = () => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#121212] px-4">
      <View className="pt-6">
        <Text className="text-xl font-semibold text-white text-center">
          💬 Messages
        </Text>

        <View className="mt-12 items-center">
          <Text className="text-[#B3B3B3] text-base">No new messages.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Messages;
