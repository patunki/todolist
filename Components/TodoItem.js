import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ task, onToggleTaskDone }) => {
  return (
    <TouchableOpacity onPress={() => onToggleTaskDone(task.id)}>
      <View style={styles.item}>
        <Text style={[styles.text, task.done && styles.done]}>
          {task.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TodoItem;
