import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../type';
import { useTasks } from '../context/TaskContext';
import uuid from 'react-native-uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

export default function AddTask({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTasks();

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título não pode estar vazio.');
      return;
    }

    const newTask: Task = {
      id: String(uuid.v4()),
      title,
      description,
      completed: false,
    };

    addTask(newTask);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          placeholder="Título da tarefa"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#7c6f57"
        />
        <TextInput
          placeholder="Descrição (opcional)"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          placeholderTextColor="#7c6f57"
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3e9dc',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fdf6ed',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2c9a0',
    backgroundColor: '#f5eee6',
    marginBottom: 14,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#7c6f57',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#e2c9a0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#7c6f57',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
