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
    <View style={styles.card}>
      <View style={styles.content}>
        <Text
          style={[styles.title, task.completed && styles.completed]}
          onPress={onToggle}
        >
          {task.completed ? '✓ ' : '○ '} {task.title}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onPress} style={styles.iconButton}>
          <Ionicons name="information-circle-outline" size={24} color="#7c6f57" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={24} color="#b85c5c" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f3e9dc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c6f57',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#b8a48a',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
});
