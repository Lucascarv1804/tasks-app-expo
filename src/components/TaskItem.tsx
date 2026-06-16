import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TaskItem as TaskType } from '../utils/handle-api';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  ButtonText,
  Heading,
  Icon,
  CloseIcon,
} from '@gluestack-ui/themed';

interface TaskItemProps {
  task: TaskType;
  updateMode: () => void;
  deleteTask: () => void;
}

// Exercício 2: componente inteiramente estilizado com NativeWind
// Exercício 4: AlertDialog do Gluestack-UI para confirmar exclusão
const TaskItem: React.FC<TaskItemProps> = ({ task, updateMode, deleteTask }) => {
  const [showAlert, setShowAlert] = useState(false);

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  const handleConfirmDelete = () => {
    setShowAlert(false);
    deleteTask();
  };

  return (
    <>
      {/* Exercício 2: NativeWind — fundo preto, bordas arredondadas, sombra, padding, flex-row, space-between */}
      <View className="bg-black rounded-lg mt-3 px-5 py-3.5 flex-row items-center justify-between shadow-md">
        <View className="flex-1 mr-2.5">
          <Text className={`text-white text-base ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.text}
          </Text>
          {task.dueDate && (
            <Text className={`text-xs mt-1 font-bold ${isOverdue ? 'text-red-400' : 'text-green-400'}`}>
              Até: {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          )}
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={updateMode} accessibilityRole="button">
            <Feather name="edit" size={20} color="#fff" style={{ padding: 2 }} />
          </TouchableOpacity>
          {/* Exercício 4: abre AlertDialog ao invés de deletar diretamente */}
          <TouchableOpacity onPress={() => setShowAlert(true)} accessibilityRole="button">
            <AntDesign name="delete" size={20} color="#fff" style={{ padding: 2 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Exercício 4: AlertDialog de confirmação de exclusão */}
      <AlertDialog isOpen={showAlert} onClose={() => setShowAlert(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Excluir Tarefa</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>Tem certeza que deseja excluir esta tarefa?</Text>
          </AlertDialogBody>
          <AlertDialogFooter className="flex-row gap-3">
            <Button variant="outline" action="secondary" onPress={() => setShowAlert(false)}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button action="negative" onPress={handleConfirmDelete}>
              <ButtonText>Excluir</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskItem;
