import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { getCategories } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<string[]>([]);
  const navigation = useNavigation(); // Use navigation to move to TasksScreen
  const { isDarkMode } = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? '#333' : '#fff' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>Categories</Text>
      </View>

      {categories.length > 0 ? (
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('CategoryTasks', { category: item })} style={{ padding: 15, backgroundColor: isDarkMode ? '#444' : '#f9f9f9', marginVertical: 5, borderRadius: 10 }}>
              <View style={{ paddingVertical: 10, }}>
                <Text style={{ fontSize: 18, color: isDarkMode ? '#fff' : '#000' }}>{item}</Text>
                <View style={{ position: 'absolute', right: 10, top: 15 }}>
                  <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>></Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Loading categories...</Text>
      )}
    </View>
  );
}
