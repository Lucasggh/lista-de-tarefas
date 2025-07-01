import React from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';

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
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
          <Text style={styles.addButtonText}>+ Nova</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
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
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Text style={styles.clearButtonText}>Limpar tudo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5eee6',
    padding: 16,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginBottom: 18,
  },
  addButton: {
    backgroundColor: '#e2c9a0',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#7c6f57',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fdf6ed',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#7c6f57',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#e2c9a0',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    color: '#7c6f57',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
