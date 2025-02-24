import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CompletedTasksScreen from '../screens/CompletedTasksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskForm from '../components/TaskForm';
import CategoryTasksScreen from '../screens/CategoryTasksScreen';

// Custom theme that keeps screens white but darkens the navigation
const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF', // Keep screens white
    card: '#1E1E1E',     // Dark nav backgrounds
    text: '#FFFFFF',     // White text for nav elements
    border: '#272727',   // Dark borders for nav elements
  },
};

const AuthStack = createNativeStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function AppTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopColor: '#272727',
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Completed Tasks" component={CompletedTasksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();
export default function RootNavigator() {
  return (
    <NavigationContainer theme={CustomTheme}>
      <RootStack.Navigator 
        screenOptions={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: '#FFFFFF' // Ensure screen backgrounds stay white
          }
        }}
      >
        <RootStack.Screen name="App" component={AppTabs} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="TaskForm" component={TaskForm} />
        <RootStack.Screen name="Categories" component={CategoriesScreen} />
        <RootStack.Screen name="CategoryTasks" component={CategoryTasksScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}