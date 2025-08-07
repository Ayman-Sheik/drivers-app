// app/profile.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';


const Profile = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === 'dark';

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  return (
    <ScrollView className="flex-1 bg-[#121212] px-4 pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Profile</Text>
        <View className="w-6" />
      </View>

      {/* User Card */}
      <View className="flex-row items-center p-4 bg-[#1e1e1e] rounded-xl mb-4">
        <View className="bg-[#1DB954] w-14 h-14 rounded-lg justify-center items-center">
          <Text className="text-black text-xl font-bold">A</Text>
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-base font-bold text-white">John Miller</Text>
          <Text className="text-sm text-gray-400">Driver</Text>
        </View>
        <View className="flex-row space-x-3">
          <TouchableOpacity>
            <FontAwesome name="clone" size={20} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="plus-circle" size={22} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>

      {/* FleetNow ID Card */}
      <View className="bg-black rounded-xl mb-6 overflow-hidden">
        <View className="bg-[#1DB954] px-4 py-2 rounded-t-xl">
          <Text className="text-black font-bold text-base">FleetNow</Text>
        </View>
        <View className="px-4 py-3">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 pr-2">
              <Text className="text-white font-semibold text-base">John Doe</Text>
              <Text className="text-gray-400 text-xs">Official Driver ID</Text>
            </View>
            <View className="items-center">
              <View className="w-14 h-14 rounded-full bg-gray-300 justify-center items-center">
                <Text className="text-[10px] text-gray-600">100×100</Text>
              </View>
              <View className="mt-1 bg-white p-1 rounded-md">
                <FontAwesome name="qrcode" size={18} color="black" />
              </View>
            </View>
          </View>

          {[
            { icon: 'id-badge', label: 'Driver ID', value: 'd001' },
            { icon: 'envelope', label: 'Email', value: 'john.doe@example.com' },
            { icon: 'phone', label: 'Phone', value: '555-0101' },
            { icon: 'bus', label: 'Vehicle', value: 'Bus 1' },
          ].map((item, idx) => (
            <View key={idx} className="flex-row items-center mb-2">
              <FontAwesome name={item.icon as any} size={14} color="white" />
              <Text className="text-white text-sm ml-2">
                {item.label}: <Text className="font-semibold">{item.value}</Text>
              </Text>
            </View>
          ))}

          <Text className="text-[10px] text-gray-400 mt-4 leading-4">
            This card is the property of FleetNow. If found, return it to our main office.
          </Text>
        </View>

        <TouchableOpacity className="bg-[#1DB954] py-2 items-center justify-center rounded-b-xl">
          <View className="flex-row items-center">
            <FontAwesome name="print" size={16} color="black" />
            <Text className="ml-2 text-black font-semibold text-sm">Print / Export ID</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Documents */}
      <Text className="text-lg font-semibold text-white mb-2">Documents</Text>
      {[
        'Drivers License',
        'Vehicle Registration',
        'Vehicle Insurance',
      ].map((title, idx) => (
        <TouchableOpacity
          key={idx}
          className="bg-[#1e1e1e] rounded-xl p-4 mb-4 flex-row justify-between items-center border border-[#333]"
        >
          <View className="flex-row items-center gap-x-2">
            <View className="bg-[#1DB954] p-2 rounded-full">
              <FontAwesome name="file" size={16} color="#000" />
            </View>
            <Text className="text-white font-medium">{title}</Text>
          </View>
          <FontAwesome name="angle-right" size={20} color="#888" />
        </TouchableOpacity>
      ))}

      {/* Settings and Help */}
      <Text className="text-lg font-semibold text-white mb-2">Settings and Help</Text>

      {/* Toggle Theme */}
      <View className="bg-[#1e1e1e] rounded-xl p-4 mb-4 flex-row justify-between items-center border border-[#333]">
        <View className="flex-row items-center gap-x-2">
          <View className="bg-[#1DB954] p-2 rounded-full">
            <FontAwesome name="adjust" size={16} color="#000" />
          </View>
          <Text className="text-white font-medium">Toggle Theme</Text>
        </View>

        <Pressable
          onPress={toggleTheme}
          className={`w-16 h-8 rounded-full flex-row items-center px-1 ${
            isDarkTheme ? 'bg-white' : 'bg-[#1DB954]'
          }`}
        >
          <View
            className={`w-6 h-6 rounded-full bg-black justify-center items-center ${
              isDarkTheme ? '' : 'ml-8 -translate-x-6'
            }`}
          >
            <FontAwesome
              name={isDarkTheme ? 'moon-o' : 'sun-o'}
              size={12}
              color={isDarkTheme ? 'white' : 'yellow'}
            />
          </View>
        </Pressable>
      </View>

      {/* Sign Out */}
      <TouchableOpacity
        onPress={handleSignOut}
        className="bg-[#1e1e1e] rounded-xl p-4 mb-8 flex-row justify-between items-center border border-[#333]"
      >
        <View className="flex-row items-center gap-x-2">
          <View className="bg-[#1DB954] p-2 rounded-full">
            <FontAwesome name="sign-out" size={16} color="#000" />
          </View>
          <Text className="text-white font-medium">Sign Out</Text>
        </View>
        <FontAwesome name="angle-right" size={20} color="#888" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
