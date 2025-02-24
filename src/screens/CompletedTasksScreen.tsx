import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import { getCompletedTasks } from '../services/api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function CompletedTasksScreen() {
  const [tasks, setCompletedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const fetchTasks = async () => {
    try {
      const data = await getCompletedTasks();
      setCompletedTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? '#333' : '#fff' }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: isDarkMode ? '#fff' : '#000' }}>Completed Tasks</Text>
      </View>
      {
        tasks.length === 0 ? (
          <Text>No tasks available</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ padding: 15, backgroundColor: isDarkMode ? '#444' : '#f9f9f9', marginVertical: 5, borderRadius: 10 }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 5 }}>
                  <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{item.category}</Text>
                  <Text style={{
                    color: item.priority === "High" ? "red" : item.priority === "Medium" ? "orange" : "green",
                    paddingHorizontal: 3
                  }}>{item.priority}</Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: isDarkMode ? '#fff' : '#000' }}>{item.title}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 5 }}>
                  <Text style={{ color: isDarkMode ? '#ccc' : '#000' }}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )
      }
    </View >
  )
}