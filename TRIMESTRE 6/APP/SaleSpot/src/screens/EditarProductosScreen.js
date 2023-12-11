// src/screens/EditarProductosScreen.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { ProductosContext } from './context/ProductosContext';

// Resto del código...

const EditarProductosScreen = ({ route, navigation }) => {
  const { id, nombre: nombreInicial } = route.params;
  const { editarProducto } = useContext(ProductosContext);
  const [nombre, setNombre] = useState(nombreInicial);

  const handleEditarProducto = () => {
    editarProducto(id, { nombre });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del Producto"
      />
      <Button title="Editar Producto" onPress={handleEditarProducto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EditarProductosScreen;
