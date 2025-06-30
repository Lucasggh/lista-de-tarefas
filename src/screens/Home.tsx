import React from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../TaskContext/TaskContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const { tasks, toggleTask, removeTask, clearTasks } = useTasks();

  const handleClearAll = () => {
    Alert.alert('Limpar tudo?', 'Essa ação é irreversível.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'OK', onPress: clearTasks },
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
            onToggle={() => toggleTask(item.id)}
            onPress={() => navigation.navigate('Details', { task: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa ainda</Text>}
      />

      {tasks.length > 0 && (
        <Button title="Limpar tudo" color="red" onPress={handleClearAll} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});
