// ProductosScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProductosScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Productos</Text>
      <Button
        title="Agregar Productos"
        onPress={() => navigation.navigate('AgregarProductos')}
      />
      <Button
        title="Listar Productos"
        onPress={() => navigation.navigate('ListarProductos')}
      />
    </View>
  );
};

export default ProductosScreen;
