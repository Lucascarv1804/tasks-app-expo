import { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, SafeAreaView, Platform,
  StatusBar as RNStatusBar, Image, Modal, Pressable
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import TaskList from './src/components/TaskList';
import { addTask, deleteTask, getAllTasks, updateTask, TaskItem as TaskType } from './src/utils/handle-api';

export default function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [text, setText] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);

  const openAddModal = () => {
    setIsUpdating(false);
    setText("");
    setCompleted(false);
    setDueDate(new Date());
    setModalVisible(true);
  };

  const updateMode = (task: TaskType) => {
    setIsUpdating(true);
    setTaskId(task._id);
    setText(task.text);
    setCompleted(task.completed);
    setDueDate(task.dueDate ? new Date(task.dueDate) : new Date());
    setModalVisible(true);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDueDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('./assets/task-app-banner.png')} style={styles.logo} resizeMode="contain" />

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Minhas Tarefas</Text>
          <Text style={styles.counterText}>Total: {tasks.length}</Text>
        </View>

        {/* pressable com escala 0.98 e elevation */}
        <Pressable
          style={({ pressed }) => [
            styles.mainButton,
            {
              transform: [{ scale: pressed ? 0.98 : 1 }],
              elevation: pressed ? 2 : 5,
              opacity: pressed ? 0.9 : 1
            }
          ]}
          onPress={openAddModal}
        >
          <Text style={styles.mainButtonText}>+ Nova Tarefa</Text>
        </Pressable>

        <TaskList
          tasks={tasks}
          updateMode={updateMode}
          deleteToDo={(_id: string) => deleteTask(_id, setTasks)}
        />

        <Pressable
          style={({ pressed }) => [
            styles.deleteBtn,
            { opacity: pressed ? 0.5 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
          ]}
          onPress={() => tasks.forEach((t: TaskType) => deleteTask(t._id, setTasks))}
        >
          <Text style={{ color: '#d9534f', textAlign: 'center', fontWeight: 'bold' }}>Limpar Lista</Text>
        </Pressable>

        {/* modal para isolar o formulário */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{isUpdating ? "Editar Tarefa" : "Nova Tarefa"}</Text>

              <TextInput
                style={styles.input}
                placeholder="O que precisa ser feito?"
                value={text}
                onChangeText={(val: string) => setText(val)}
              />

              <View style={styles.row}>
                <Text style={styles.label}>Tarefa Concluída?</Text>
                {/* expo-checkbox */}
                <Checkbox
                  value={completed}
                  onValueChange={(newValue: boolean) => setCompleted(newValue)}
                  color={completed ? '#000' : undefined}
                />
              </View>

              {/* Requisito 3: datetimepicker */}
              <Pressable style={styles.datePickerBtn} onPress={() => setShowDatePicker(true)}>
                <Text>📅 Data Limite: {dueDate.toLocaleDateString('pt-BR')}</Text>
              </Pressable>

              {showDatePicker && (
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              <View style={styles.modalActions}>
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: '#666' }}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.saveBtn,
                    {
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                      opacity: pressed ? 0.8 : 1
                    }
                  ]}
                  onPress={() => {
                    if (!text.trim()) {
                      alert("Digite o titulo da tarefa");
                      return;
                    }

                    isUpdating
                      ? updateTask(taskId, text, completed, dueDate.toISOString(), setTasks, setText, setIsUpdating, setModalVisible)
                      : addTask(text, completed, dueDate.toISOString(), setText, setTasks, setModalVisible);
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 },
  container: { flex: 1, paddingHorizontal: 20 },
  logo: { width: 150, height: 50, alignSelf: 'center', marginTop: 10 },
  headerContainer: { marginVertical: 20, alignItems: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  counterText: { color: '#666' },
  mainButton: { backgroundColor: '#000', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  mainButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  deleteBtn: { padding: 15, marginBottom: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '90%', borderRadius: 20, padding: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 10, fontSize: 16, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  label: { fontSize: 16, color: '#444' },
  datePickerBtn: { padding: 12, backgroundColor: '#eee', borderRadius: 8, marginBottom: 25 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15, alignItems: 'center' },
  cancelBtn: { padding: 12 },
  saveBtn: { backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, elevation: 3 }
});