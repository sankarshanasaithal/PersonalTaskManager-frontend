import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: isDarkMode ? '#333' : '#fff' }}>
      {/* Profile Picture */}
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual profile picture URL
        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
      />

      {/* User Details */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: isDarkMode ? '#fff' : '#333' }}>John Doe</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>johndoe@example.com</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginTop: 10,
        }}
        onPress={toggleTheme}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Text>
      </TouchableOpacity>
    </View>
  );
}
