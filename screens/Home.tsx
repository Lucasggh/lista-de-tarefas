import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('AddTask')} />
      <Button title="Ver Detalhes" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}