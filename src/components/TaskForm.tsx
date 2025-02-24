import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addTask, updateTask } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const TaskSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    completed: Yup.string(),
    priority: Yup.string().required('Priority is required'),
    category: Yup.string().required('Category is required'),
});

export default function TaskForm() {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const handleAddTask = async (values) => {
        try {
            await addTask(values);
            console.log('Task added successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const navigation = useNavigation();
    const route = useRoute();
    const task = route.params?.task; // Get task data if passed

    const isEditing = !!task; // Checks if one is editing

    const handleSubmit = async (values) => {
        try {
            if (isEditing) {
                await updateTask(task.id, values); // Call API to update task
            } else {
                await addTask(values); // Call API to add new task
            }
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save task:', error);
        }
    };

    return (
        <Formik
            initialValues={{ title: '', description: '', completed: '', priority: '', category: '' }}
            validationSchema={TaskSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                    />
                    {errors.title && touched.title ? <Text style={styles.error}>{errors.title}</Text> : null}

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                    />
                    {errors.description && touched.description ? <Text style={styles.error}>{errors.description}</Text> : null}

                    {/* <Text style={styles.label}>Due Date</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('dueDate')}
                        onBlur={handleBlur('dueDate')}
                        value={values.dueDate}
                    />
                    {errors.dueDate && touched.dueDate ? <Text style={styles.error}>{errors.dueDate}</Text> : null} */}

                    <Text style={styles.label}>Priority</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('priority')}
                        onBlur={handleBlur('priority')}
                        value={values.priority}
                    />
                    {errors.priority && touched.priority ? <Text style={styles.error}>{errors.priority}</Text> : null}

                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('category')}
                        onBlur={handleBlur('category')}
                        value={values.category}
                    />
                    {errors.category && touched.category ? <Text style={styles.error}>{errors.category}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{isEditing ? 'Update Task' : 'Add Task'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});