import axios from "axios";

const API_URL = "http://192.168.0.90:5000";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Add a new task
export const addTask = async (task: { title: string; description: string }) => {
  try {
    const response = await api.post("/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId: number, updates: object) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: number) => {
  try {
    await api.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// Get pending tasks
export const getPendingTasks = async () => {
  try {
    const response = await api.get("/tasks/pending");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
    throw error;
  }
};

// Get completed tasks
export const getCompletedTasks = async () => {
  try {
    const response = await api.get("/tasks/completed");
    return response.data;
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    throw error;
  }
};
