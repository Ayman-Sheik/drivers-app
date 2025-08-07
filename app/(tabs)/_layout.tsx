import { images } from "@/constants/images";
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

type TabItem = {
  name: string;
  title: string;
  icon: 'home' | 'comment' | 'camera' | 'location-arrow' | 'history' | 'user';
};

const TabIcon = ({
  focused,
  iconName,
  title,
}: {
  focused: boolean;
  iconName: TabItem['icon'];
  title: string;
}) => {
  return focused ? (
    <ImageBackground
      source={images.highlight}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 112,
        height: 56,
        marginTop: 16,
        borderRadius: 999,
        overflow: 'hidden',
        backgroundColor: '#1DB954', // fallback
      }}
    >
      <FontAwesome name={iconName} size={20} color="#000" style={{ marginRight: 8 }} />
      <Text style={{ color: '#000', fontWeight: '600' }}>{title}</Text>
    </ImageBackground>
  ) : (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <FontAwesome name={iconName} size={20} color="#B3B3B3" />
    </View>
  );
};

const _layout = () => {
  const tabs: TabItem[] = [
    { name: 'index', title: 'Home', icon: 'home' },
    { name: 'messages', title: 'Messages', icon: 'comment' },
    { name: 'Scan', title: 'Scan', icon: 'camera' },
    { name: 'Route', title: 'Route', icon: 'location-arrow' },
    //{ name: 'History', title: 'History', icon: 'history' },
    { name: 'profile', title: 'Profile', icon: 'user' },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#121212',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 56,
          position: 'absolute',
          overflow: 'hidden',
          borderColor: '#121212',
          borderWidth: 1,
          elevation: 10,
        },
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} iconName={icon} title={title} />
            ),
          }}
        />
      ))}

      <Tabs.Screen
        name="preview"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
