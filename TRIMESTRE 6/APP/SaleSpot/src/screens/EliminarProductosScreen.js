// src/screens/EliminarProductosScreen.js
import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ProductosContext } from './context/ProductosContext';
// Resto del código...

const EliminarProductosScreen = ({ route, navigation }) => {
  const { id, nombre } = route.params;
  const { eliminarProducto } = useContext(ProductosContext);

  const handleEliminarProducto = () => {
    eliminarProducto(id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Button title={`Eliminar ${nombre}`} onPress={handleEliminarProducto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});

export default EliminarProductosScreen;
