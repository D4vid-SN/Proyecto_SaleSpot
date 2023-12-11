// src/screens/ProductosScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { ProductosContext } from './context/ProductosContext';

// Resto del código...

const ProductosScreen = ({ navigation }) => {
  const { productos } = useContext(ProductosContext);

  const handleNavegarAgregar = () => {
    navigation.navigate('AgregarProductos');
  };

  const handleNavegarEditar = (id, nombre) => {
    navigation.navigate('EditarProductos', { id, nombre });
  };

  const handleNavegarEliminar = (id, nombre) => {
    navigation.navigate('EliminarProductos', { id, nombre });
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Producto" onPress={handleNavegarAgregar} />
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.nombre}</Text>
            <Button title="Editar" onPress={() => handleNavegarEditar(item.id, item.nombre)} />
            <Button title="Eliminar" onPress={() => handleNavegarEliminar(item.id, item.nombre)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  itemContainer: {
    marginBottom: 12,
  },
});

export default ProductosScreen;

