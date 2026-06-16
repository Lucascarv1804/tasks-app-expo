import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

interface TaskProps {
  text: string;
  updateMode: () => void;
  deleteTask: () => void;
}

// Exercício 2: componente refatorado para NativeWind (sem StyleSheet)
const Task: React.FC<TaskProps> = ({ text, updateMode, deleteTask }) => {
  return (
    <View className="bg-black rounded-lg mt-4 px-8 py-6 flex-row items-center justify-between shadow-md">
      <Text className="text-white text-base flex-1">{text}</Text>
      <View className="flex-row gap-4 ml-4">
        <TouchableOpacity onPress={updateMode}>
          <Feather name="edit" size={20} color="#fff" style={{ padding: 2 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteTask}>
          <AntDesign name="delete" size={20} color="#fff" style={{ padding: 2 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Task;
