import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './Components/TodoItem';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error ', error);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Error ', error);
    }
  };

  const addTask = () => {
    if (task.length > 0) {
      const newTask = { id: Date.now().toString(), text: task, done: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setTask('');
    }
  };

  const toggleTaskDone = (taskId) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem task={item} onToggleTaskDone={toggleTaskDone} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
