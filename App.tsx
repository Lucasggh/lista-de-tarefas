import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import AddTask from './src/screens/AddTask';
import Details from './src/screens/Details';
import { RootStackParamList } from './src/type';

const Stack = createNativeStackNavigator<RootStackParamList>();

import { TaskProvider } from './src/context/TaskContext';

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Tarefas',
              headerStyle: { backgroundColor: '#e2c9a0' },
              headerTitleStyle: { color: '#7c6f57', fontWeight: 'bold', fontSize: 24 },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTask}
            options={{
              title: 'Adicionar Tarefa',
              headerStyle: { backgroundColor: '#e2c9a0' },
              headerTitleStyle: { color: '#7c6f57', fontWeight: 'bold', fontSize: 22 },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{ title: 'Detalhes da Tarefa' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
