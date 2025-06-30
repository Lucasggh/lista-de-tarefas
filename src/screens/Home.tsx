import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../type';
import TaskCard from '../components/TaskCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation, route }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  
  useEffect(() => {
    if (route.params?.newTask) {
      setTasks((prev) => [...prev, route.params!.newTask!]);
    }
  }, [route.params?.newTask]);

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearAll = () => {
    Alert.alert("Limpar todas?", "Você tem certeza?", [
      { text: "Cancelar", style: "cancel" },
      { text: "OK", onPress: () => setTasks([]) }
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('AddTask')} />
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onDelete={() => removeTask(item.id)}
            onToggle={() => toggleTaskCompletion(item.id)}
            onPress={() => navigation.navigate('Details', { task: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa adicionada</Text>}
      />

      {tasks.length > 0 && (
        <Button title="Limpar todas" onPress={clearAll} color="red" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  empty: { marginTop: 20, textAlign: 'center', color: '#777' },
});
