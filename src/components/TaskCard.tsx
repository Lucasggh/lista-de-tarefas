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
          <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
});
