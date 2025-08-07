import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PreviewScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();

  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const generatePDF = async () => {
    if (!uri || !filename.trim()) {
      Alert.alert(
        "Missing Info",
        "Please provide a filename and scan an image."
      );
      return;
    }

    try {
      // Convert the image to base64
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const imageMimeType = uri.endsWith(".png") ? "image/png" : "image/jpeg";
      const imageSrc = `data:${imageMimeType};base64,${base64Image}`;

      const html = `
        <html>
          <body style="font-family: Arial; padding: 24px;">
            <h1 style="color: #1DB954;">${filename}</h1>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Vehicle:</strong> ${vehicle}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Date:</strong> ${date.toLocaleString()}</p>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Amount:</strong> ₹${amount}</p>
            <img src="${imageSrc}" alt="Scanned Document" style="width: 100%; margin-top: 16px;" />
          </body>
        </html>
      `;

      const { uri: pdfUri } = await Print.printToFileAsync({ html });

      const newPdfPath = `${
        FileSystem.documentDirectory
      }${filename.trim()}.pdf`;
      await FileSystem.moveAsync({ from: pdfUri, to: newPdfPath });

      const logEntry = {
        filename: filename.trim(),
        description,
        vehicle,
        type,
        date: date.toLocaleString(),
        status,
        amount,
        fileUri: newPdfPath,
      };

      const prevLogs = await AsyncStorage.getItem("pdfLogEntries");
      const logs = prevLogs ? JSON.parse(prevLogs) : [];
      logs.push(logEntry);
      await AsyncStorage.setItem("pdfLogEntries", JSON.stringify(logs));

      await Sharing.shareAsync(newPdfPath);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to generate or share the PDF.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212] px-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-white text-2xl font-bold my-4 text-center">
          Preview & Save
        </Text>

        {/* Image Preview */}
        {uri && (
          <Image
            source={{ uri }}
            className="w-full h-64 rounded-xl mb-4"
            resizeMode="contain"
          />
        )}

        {/* Input Fields */}
        <TextInput
          placeholder="Filename (required)"
          placeholderTextColor="#888"
          value={filename}
          onChangeText={setFilename}
          className="bg-[#1e1e1e] text-white p-4 rounded-xl"
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
          className="bg-[#1e1e1e] text-white p-4 rounded-xl mt-3"
        />
        <TextInput
          placeholder="Vehicle"
          placeholderTextColor="#888"
          value={vehicle}
          onChangeText={setVehicle}
          className="bg-[#1e1e1e] text-white p-4 rounded-xl mt-3"
        />

        {/* Type Dropdown */}
        <View className="mt-3 bg-[#1C1C1C] rounded-lg border border-[#333]">
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            dropdownIconColor="#fff"
            style={{ color: "#fff" }}
          >
            <Picker.Item label="Insurance" value="Insurance" />
            <Picker.Item label="Fuel" value="Fuel" />
            <Picker.Item label="Maintenance" value="Maintenance" />
            <Picker.Item label="Tolls" value="Tolls" />
            <Picker.Item label="Misc" value="Misc" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Status Dropdown */}
        <View className="mt-3 bg-[#1C1C1C] rounded-lg border border-[#333]">
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            dropdownIconColor="#fff"
            style={{ color: "#fff" }}
          >
            <Picker.Item label="Select Status" value="" />
            <Picker.Item label="Paid" value="Paid" />
            <Picker.Item label="Unpaid" value="Unpaid" />
            <Picker.Item label="Pending" value="Pending" />
          </Picker>
        </View>

        <TextInput
          placeholder="Amount"
          placeholderTextColor="#888"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          className="bg-[#1e1e1e] text-white p-4 rounded-xl mt-3"
        />

        {/* Date Picker */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-[#1e1e1e] p-4 rounded-xl mt-3"
        >
          <Text className="text-white">
            {`Date: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity
          onPress={generatePDF}
          className="bg-[#1DB954] p-4 rounded-xl mt-2 mb-8"
        >
          <Text className="text-black text-center font-bold text-lg">
            Generate PDF
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
