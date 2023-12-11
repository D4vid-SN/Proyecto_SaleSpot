import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PerfilesUsuariosScreen = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await axios.get('http://192.168.20.20:3000/usuarios');
      const usuariosConDescripcionRol = await Promise.all(
        response.data.map(async (usuario) => {
          const rolResponse = await axios.get(`http://192.168.20.20:3000/roles/${usuario.rol}`);
          const descripcionRol = rolResponse.data.desc_rol;
          return { ...usuario, desc_rol: descripcionRol };
        })
      );
      setUsuarios(usuariosConDescripcionRol);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setLoading(false);
    }
  };

  const handleEditarUsuario = (tdoc_user, id_user) => {
    // Navegar a la pantalla de editar con los parámetros necesarios
    navigation.navigate('EditarUsuariosScreen', { tdoc_user, id_user });
  };
  
  const handleEliminarUsuario = (tdoc_user, id_user) => {
    // Navegar a la pantalla de editar con los parámetros necesarios
    navigation.navigate('EliminarUsuariosScreen', { tdoc_user, id_user });
  };
//   const handleEliminarUsuario = async (tdoc_user, id_user) => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/usuarios/${tdoc_user}/${id_user}`);
//       if (response.status === 200) {
//         // Actualizar la lista de usuarios después de eliminar uno
//         cargarUsuarios();
//       }
//     } catch (error) {
//       console.error('Error al eliminar usuario:', error);
//     }
//   };

  const renderizarItem = ({ item }) => (
    <View style={styles.item} key={`${item.tdoc_user}-${item.id_user}`}>
      <Text>{`Nombre: ${item.nombre_1} ${item.apellido_1}`}</Text>
      <Text>{`Rol: ${item.desc_rol}`}</Text>
      <Text>{`Estado: ${item.estado ? 'Activo' : 'Inactivo'}`}</Text>
      <View style={styles.botonesContainer}>
        <TouchableOpacity
          style={styles.botonEditar}
          onPress={() => handleEditarUsuario(item.tdoc_user, item.id_user)}
        >
          <Text>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonEliminar}
          onPress={() => handleEliminarUsuario(item.tdoc_user, item.id_user)}
        >
          <Text>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfiles de Usuarios</Text>
      {loading ? (
        <Text>Cargando usuarios...</Text>
      ) : usuarios.length === 0 ? (
        <Text>No hay usuarios registrados en el sistema.</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => `${item.tdoc_user}-${item.id_user}`}
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

export default PerfilesUsuariosScreen;














