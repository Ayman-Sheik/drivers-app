import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  const handleScanPress = () => {
    router.push('/(tabs)/Scan' as any);
  };

  const handleDocsPress = () => {
    router.push('/(tabs)/Scan' as any);
  };

  const handleSchedulePress = () => {
    alert('Redirect to class/meeting schedule');
  };

  const handleProfilePress = () => {
    router.push('/profile' as any); // Uncomment if you want to use a string path
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#121212] px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mt-2">
        <TouchableOpacity onPress={handleProfilePress}>
          <FontAwesome name="user-circle" size={28} color="#B3B3B3" />
        </TouchableOpacity>

        <FontAwesome name="bell" size={24} color="#B3B3B3" />
      </View>

      {/* Tap to Scan */}
      <TouchableOpacity
        onPress={handleScanPress}
        className="mt-6 bg-[#1DB954] rounded-2xl p-5 items-center"
      >
        <View className="h-[150px] w-[150px] bg-[#1ed760] rounded-2xl justify-center items-center">
          <FontAwesome name="camera" size={50} color="#000" />
          <Text className="text-black text-base font-semibold mt-2">Tap to Scan</Text>
        </View>
        <Text className="text-black mt-3 text-sm text-center font-medium">
          📄 Convert images to PDF and save instantly
        </Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View className="mt-6 flex-row justify-between">
        <TouchableOpacity
          onPress={handleDocsPress}
          className="bg-[#1C1C1C] rounded-xl flex-1 mr-2 p-4 items-center border border-[#2A2A2A]"
        >
          <FontAwesome name="file" size={24} color="#1DB954" />
          <Text className="mt-2 text-sm font-medium text-white text-center">
            Scan Docs / Receipts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSchedulePress}
          className="bg-[#1C1C1C] rounded-xl flex-1 ml-2 p-4 items-center border border-[#2A2A2A]"
        >
          <FontAwesome name="calendar" size={24} color="#1DB954" />
          <Text className="mt-2 text-sm font-medium text-white text-center">
            Check Schedule
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
