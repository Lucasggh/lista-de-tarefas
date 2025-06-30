import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '../type';

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearTasks: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve estar dentro de TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const removeTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const clearTasks = () => setTasks([]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
