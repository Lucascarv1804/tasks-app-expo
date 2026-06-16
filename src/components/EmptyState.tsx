import React from 'react';
import { View } from 'react-native';
import { Heading, Text } from '@gluestack-ui/themed';

// Exercício 5: EmptyState combina NativeWind (View container) com Gluestack-UI (Heading e Text)
const EmptyState: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center my-16 mx-4">
      <Heading size="xl" className="text-gray-500 mb-2">
        Nenhuma tarefa aqui!
      </Heading>
      <Text size="md" className="text-gray-400 text-center">
        Você não tem tarefas nesta categoria.{'\n'}Que tal criar uma nova?
      </Text>
    </View>
  );
};

export default EmptyState;
