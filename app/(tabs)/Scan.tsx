import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Animated,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

type LogEntry = {
  filename: string;
  description: string;
  vehicle: string;
  type: string;
  date: string;
  status: string;
  amount: string;
  fileUri: string;
};

export default function Scan() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [deletedItem, setDeletedItem] = useState<LogEntry | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadLogEntries();
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      params?.filename &&
      params?.fileUri &&
      typeof params?.filename === 'string'
    ) {
      const newEntry: LogEntry = {
        filename: params.filename as string,
        description: (params.description as string) || '',
        vehicle: (params.vehicle as string) || '',
        type: (params.type as string) || '',
        date: (params.date as string) || '',
        status: (params.status as string) || '',
        amount: (params.amount as string) || '',
        fileUri: params.fileUri as string,
      };

      const updatedEntries = [newEntry, ...logEntries];
      setLogEntries(updatedEntries);
      saveLogEntries(updatedEntries);
    }
  }, [params]);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera access is needed to scan documents.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const photoUri = result.assets[0].uri;
      router.push({
        pathname: '/preview' as any,
        params: { uri: photoUri },
      });
    }
  };

  const loadLogEntries = async () => {
    const entries = await AsyncStorage.getItem('pdfLogEntries');
    if (entries) {
      setLogEntries(JSON.parse(entries));
    }
  };

  const saveLogEntries = async (entries: LogEntry[]) => {
    await AsyncStorage.setItem('pdfLogEntries', JSON.stringify(entries));
  };

  const handleDelete = (index: number) => {
    const entryToDelete = logEntries[index];
    const updatedEntries = [...logEntries];
    updatedEntries.splice(index, 1);
    setLogEntries(updatedEntries);
    saveLogEntries(updatedEntries);
    setDeletedItem(entryToDelete);

    undoTimerRef.current = setTimeout(() => {
      setDeletedItem(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (deletedItem) {
      const restoredEntries = [deletedItem, ...logEntries];
      setLogEntries(restoredEntries);
      saveLogEntries(restoredEntries);
      setDeletedItem(null);
    }
  };

  const renderRightActions = (_progress: any, _dragX: any, index: number) => (
    <TouchableOpacity
      onPress={() => handleDelete(index)}
      className="bg-red-600 justify-center items-center w-20 h-full"
    >
      <FontAwesome name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-[#121212] px-4 pt-4">
        <Text className="text-white text-xl font-bold mb-4 text-center">Scan a Document</Text>

        <TouchableOpacity
          onPress={openCamera}
          className="bg-[#1DB954] px-6 py-4 rounded-xl items-center mb-6"
        >
          <Text className="text-black font-bold text-lg">📷 Open Camera</Text>
        </TouchableOpacity>

        <Text className="text-white text-xl font-bold mb-2">PDF History</Text>

        <FlatList
          data={logEntries}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }: { item: LogEntry; index: number }) => (
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, index)
              }
            >
              <Pressable
                onPress={() => Sharing.shareAsync(item.fileUri)}
                className="bg-[#1e1e1e] p-4 rounded-xl mb-3"
              >
                <Text className="text-white font-semibold">{item.filename}</Text>
                <Text className="text-gray-400">{item.description}</Text>
                <Text className="text-gray-400">{item.vehicle} | {item.type}</Text>
                <Text className="text-gray-400">{item.date} | ₹{item.amount} | {item.status}</Text>
              </Pressable>
            </Swipeable>
          )}
        />

        {deletedItem && (
          <View className="absolute bottom-4 left-4 right-4 bg-[#333] p-4 rounded-xl flex-row justify-between items-center">
            <Text className="text-white">Deleted "{deletedItem.filename}"</Text>
            <TouchableOpacity onPress={handleUndo}>
              <Text className="text-[#1DB954] font-semibold">Undo</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
