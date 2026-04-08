import * as React from 'react'; // Resolve o erro de esModuleInterop
import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import { TaskItem as TaskType } from '../utils/handle-api';

interface TaskListProps {
  tasks: TaskType[];
  updateMode: (task: TaskType) => void; // Ajustado para aceitar o objeto completo
  deleteToDo: (_id: string) => void;
}

// Definimos o tipo diretamente nos argumentos para evitar o erro de "any" implícito
const TaskList = ({ tasks, updateMode, deleteToDo }: TaskListProps) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          updateMode={() => updateMode(item)}
          deleteToDo={() => deleteToDo(item._id)}
        />
      )}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  }
});

export default TaskList;