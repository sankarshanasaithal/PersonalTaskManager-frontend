import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TaskCards from '../components/TaskCards';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Tasks</Text>
        <TouchableOpacity onPress={() => navigation.navigate("TaskForm")}>
          <Text style={{ color: "blue" }}>+ Add Task</Text>
        </TouchableOpacity>
      </View>
      <TaskCards />
    </View>
  );
}