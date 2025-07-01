import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Task } from '../type';

type RouteParams = {
  Details: { task: Task };
};

export default function DetailsScreen() {
  const route = useRoute<RouteProp<RouteParams, 'Details'>>();
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description || 'Sem descrição.'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5eee6',
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7c6f57',
    marginBottom: 18,
    alignSelf: 'center',
  },
  description: {
    fontSize: 17,
    color: '#7c6f57',
    textAlign: 'center',
  },
});
