import axios from 'axios';
import * as React from 'react';
import { Alert } from 'react-native'; // Importamos o Alert

const baseURL = 'https://todo-app-express-backend-rtbt.onrender.com';

export interface TaskItem {
  _id: string;
  text: string;
  completed: boolean;
  dueDate?: string; 
}

export const getAllTasks = (setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>) => {
  axios.get<TaskItem[]>(`${baseURL}`)
    .then(({ data }) => setTasks(data))
    .catch((err) => console.log("Erro ao carregar:", err));
};

export const addTask = (
  text: string,
  completed: boolean,
  dueDate: string,
  setText: (val: string) => void,
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>,
  setModalVisible: (val: boolean) => void
) => {
  axios
    .post(`${baseURL}/save`, { text, completed, dueDate })
    .then(() => {
      setText('');
      setModalVisible(false);
      getAllTasks(setTasks);
    })
    .catch((err) => {
      console.log(err);
      Alert.alert("Erro", "Não foi possível salvar a tarefa. Tente novamente.");
    });
};

export const updateTask = (
  taskId: string,
  text: string,
  completed: boolean,
  dueDate: string,
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>,
  setText: (val: string) => void,
  setIsUpdating: (val: boolean) => void,
  setModalVisible: (val: boolean) => void
) => {
  axios
    .post(`${baseURL}/update`, { _id: taskId, text, completed, dueDate })
    .then(() => {
      setText('');
      setIsUpdating(false);
      setModalVisible(false);
      getAllTasks(setTasks);
    })
    .catch((err) => {
      console.log(err);
      Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
    });
};

export const deleteTask = (
  _id: string,
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>
) => {
  axios
    .post(`${baseURL}/delete`, { _id })
    .then(() => getAllTasks(setTasks))
    .catch((err) => console.log(err));
};