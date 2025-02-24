import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { getTasks, deleteTask, toggleTaskStatus } from '../services/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function TaskCards() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const handleEdit = (task) => {
        navigation.navigate('TaskForm', { task });
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleToggleStatus = async (taskId) => {
        try {
            await toggleTaskStatus(taskId);
            await fetchTasks(); // Make sure to wait for the toggle before refreshing
        } catch (error) {
            console.error('Failed to toggle task status:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to load tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <View style={{ flex: 1 }}>
            {
                tasks.length === 0 ? (
                    <Text>No tasks available</Text>
                ) : (
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{ padding: 15, backgroundColor: "#f9f9f9", marginVertical: 5, borderRadius: 10 }}
                            >
                                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 5 }}>
                                    <Text>{item.category}</Text>
                                    <Text style={{
                                        color: item.priority === "High" ? "red" : item.priority === "Medium" ? "orange" : "green",
                                        // backgroundColor: item.priority === "High" ? "#ffcccc" : item.priority === "Medium" ? "#ffe5b4" : "#ccffcc",
                                        paddingHorizontal: 3
                                    }}>{item.priority}</Text>
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
                                <Text>{item.description}</Text>
                                <View style={{ flexDirection: "row-reverse", justifyContent: "space-between", paddingTop: 10 }}>
                                    {/* <Text style={{ fontWeight: 'bold' }}>{item.dueDate}</Text> */}
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => handleEdit(item)}>
                                            <Text style={{ color: "blue" }}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                            <Text style={{ color: "red" }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ padding: 5, backgroundColor: item.completed === false ? "red" : "green", borderRadius: 5, marginTop: 10 }} onPress={() => handleToggleStatus(item.id)}>
                                    <Text style={{ color: "white", textAlign: "center" }} >{item.completed === false ? "Pending" : "Completed"}</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                )
            }
        </View >
    )
}