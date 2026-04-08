import * as React from 'react'; // Correção do erro de esModuleInterop
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TaskItem as TaskType } from '../utils/handle-api';

interface TaskItemProps {
  task: TaskType;
  updateMode: () => void;
  deleteToDo: () => void;
}

// Correção do erro de "implicitly has an any type": definindo explicitamente o tipo dos argumentos
const TaskItem = ({ task, updateMode, deleteToDo }: TaskItemProps) => {
  return (
    <View style={styles.todo}>
      <View style={{ flex: 1 }}>
        <Text style={[
          styles.text, 
          task.completed && styles.completedText
        ]}>
          {task.text}
        </Text>
        
        {task.dueDate && (
          <Text style={styles.dateText}>
            📅 {new Date(task.dueDate).toLocaleDateString('pt-BR')}
          </Text>
        )}
      </View>

      <View style={styles.icons}>
        <Pressable 
          onPress={updateMode}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, transform: [{ scale: pressed ? 0.9 : 1 }] }]}
        >
          <Feather name="edit" size={20} color="#fff" style={styles.icon} />
        </Pressable>
        
        <Pressable 
          onPress={deleteToDo}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, transform: [{ scale: pressed ? 0.9 : 1 }] }]}
        >
          <AntDesign name="delete" size={20} color="#fff" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  text: { color: '#fff', fontSize: 16 },
  completedText: { textDecorationLine: 'line-through', color: '#888' },
  dateText: { color: '#aaa', fontSize: 12, marginTop: 4 },
  icons: { flexDirection: 'row', gap: 16, marginLeft: 16 },
  icon: { padding: 2 },
});

export default TaskItem;