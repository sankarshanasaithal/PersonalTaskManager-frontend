import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getTasksByCategory } from '../services/api';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function CategoryTasksScreen() {
  const route = useRoute();
  const { category } = route.params as { category: string };
  const [tasks, setTasks] = useState<any[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasksByCategory(category);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? '#333' : '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>Tasks in {category}</Text>

      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#555' : '#ccc' }}>
              <Text style={{ fontSize: 18, color: isDarkMode ? '#fff' : '#000' }}>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>No tasks available.</Text>
      )}
    </View>
  );
}
