import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TaskCards from '../components/TaskCards';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? '#333' : '#fff' }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: isDarkMode ? '#fff' : '#000' }}>Tasks</Text>
        <TouchableOpacity onPress={() => navigation.navigate("TaskForm")}>
          <Text style={{ color: isDarkMode ? "skyblue" : "blue" }}>+ Add Task</Text>
        </TouchableOpacity>
      </View>
      <TaskCards />
    </View>
  );
}