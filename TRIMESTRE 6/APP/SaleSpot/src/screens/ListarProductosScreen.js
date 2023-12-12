import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ListarProductosScreen = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:3000/producto');
      const productosConDescripcionTipo = await Promise.all(
        response.data.map(async (producto) => {
          const tipoResponse = await axios.get(`http://192.168.1.14:3000/tipoProducto/${producto.tipo_prod}`);
          const descripcionTipo = tipoResponse.data.tipo_prod;
          return { ...producto, desc_tipo_prod: descripcionTipo };
        })
      );
      setProductos(productosConDescripcionTipo);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setLoading(false);
    }
  };

  const handleEditarProducto = (producto) => {
    navigation.navigate('EditarProductos', { producto });
  };
  


  const handleEliminarProducto = async (idProducto) => {
    try {
      setLoading(true);
      await axios.delete(`http://192.168.1.14:3000/producto/${idProducto}`);
      setLoading(false);
      cargarProductos(); // Actualizar la lista después de eliminar
    } catch (error) {
      setLoading(false);
      console.error('Error al eliminar producto:', error);
    }
  };

  const renderizarItem = ({ item }) => (
    <View style={styles.item} key={`${item.id_prod}`}>
      <Text>{`Descripción: ${item.desc_prod}`}</Text>
      <Text>{`Tipo: ${item.desc_tipo_prod}`}</Text>
      <Text>{`Valor: ${item.valor_prod}`}</Text>
      <Text>{`Estado: ${item.estado_prod ? 'Activo' : 'Inactivo'}`}</Text>
      <View style={styles.botonesContainer}>
        <TouchableOpacity
          style={styles.botonEditar}
          onPress={() => handleEditarProducto(item)}
        >
          <Text>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonEliminar}
          onPress={() => handleEliminarProducto(item.id_prod)}
        >
          <Text>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listar Productos</Text>
      {loading ? (
        <Text>Cargando productos...</Text>
      ) : productos.length === 0 ? (
        <Text>No hay productos registrados en el sistema.</Text>
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => `${item.id_prod}`}
          renderItem={renderizarItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
    marginBottom: 10,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botonEditar: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  botonEliminar: {
    backgroundColor: 'salmon',
    padding: 10,
    borderRadius: 5,
  },
});

export default ListarProductosScreen;

