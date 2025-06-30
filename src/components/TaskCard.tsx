import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../type';

type Props = {
  task: Task;
  onDelete: () => void;
  onToggle: () => void;
  onPress: () => void;
};

export default function TaskCard({ task, onDelete, onToggle, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <Text
          style={[styles.title, task.completed && styles.completed]}
          onPress={onToggle}
        >
          {task.completed ? '✓ ' : '○ '} {task.title}
        </Text>
        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
