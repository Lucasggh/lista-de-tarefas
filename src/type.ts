export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export type RootStackParamList = {
  Home: { newTask?: Task } | undefined;
  AddTask: undefined;
  Details: { task: Task };
};
