import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type FilterType = 'all' | 'completed' | 'pending';
type SortType = 'created' | 'az' | 'za';
// IMPORTS MESMOS DE ANTES...
// Mesma estrutura de useState, useMemo, etc.

export default function Home({ navigation }: Props) {
  const { tasks, toggleTask, removeTask, clearTasks } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('created');

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === 'completed') {
      result = result.filter((task) => task.completed);
    } else if (filter === 'pending') {
      result = result.filter((task) => !task.completed);
    }

    if (sort === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'za') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [tasks, filter, sort]);

  const handleClearAll = () => {
    Alert.alert('Limpar tudo?', 'Essa ação é irreversível.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'OK', onPress: clearTasks },
    ]);
  };

return (
  <View style={styles.container}>
    {/* Título */}
    <Text style={styles.title}>Tarefas</Text>

    {/* Linha com filtros e limpar */}
    <View style={styles.topControls}>
      <TouchableOpacity
        onPress={() =>
          setFilter(
            filter === 'all'
              ? 'completed'
              : filter === 'completed'
              ? 'pending'
              : 'all'
          )
        }
        style={styles.controlButton}
      >
        <Text style={styles.controlText}>
          Filtro: {filter === 'all' ? 'Todas' : filter === 'completed' ? 'Concluídas' : 'Pendentes'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setSort(
            sort === 'created' ? 'az' : sort === 'az' ? 'za' : 'created'
          )
        }
        style={styles.controlButton}
      >
        <Text style={styles.controlText}>
          Ordem: {sort === 'created' ? 'Criação' : sort === 'az' ? 'A-Z' : 'Z-A'}
        </Text>
      </TouchableOpacity>

      {tasks.length > 0 && (
        <TouchableOpacity
          onPress={handleClearAll}
          style={styles.controlButton}
        >
          <Text style={styles.controlText}>Limpar tudo</Text>
        </TouchableOpacity>
      )}
    </View>

    {/* Lista */}
    <View style={styles.card}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onDelete={() => removeTask(item.id)}
            onToggle={() => toggleTask(item.id)}
            onPress={() => navigation.navigate('Details', { task: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma tarefa encontrada</Text>
        }
      />
    </View>

    {/* Botão flutuante */}
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate('AddTask')}
    >
      <Text style={styles.floatingButtonText}>+ Nova</Text>
    </TouchableOpacity>
  </View>
);}
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
    width: '100%',
    maxWidth: 400,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: '#e2c9a0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontWeight: 'bold',
    color: '#7c6f57',
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
    flex: 1,
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
  },  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7c6f57',
    marginBottom: 12,


  },
  floatingButtonText: {
    color: '#7c6f57',
    fontSize: 18,
    fontWeight: 'bold',
  },

topControls: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: 400,
  marginBottom: 12,
},

controlButton: {
  backgroundColor: '#e2c9a0',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  marginRight: 6,
  marginBottom: 6,
},

controlText: {
  color: '#7c6f57',
  fontWeight: 'bold',
},

floatingButton: {
  position: 'absolute',
  bottom: 80,
  alignSelf: 'center',
  backgroundColor: '#e2c9a0',
  paddingVertical: 14,
  paddingHorizontal: 32,
  borderRadius: 32,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 6,
},

},
);
