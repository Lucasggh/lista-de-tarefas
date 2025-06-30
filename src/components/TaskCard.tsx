import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../type';
import { v4 as uuidv4 } from 'uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

export default function AddTask({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título não pode estar vazio.");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false
    };

    navigation.navigate('Home', { newTask });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título da tarefa"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
});
