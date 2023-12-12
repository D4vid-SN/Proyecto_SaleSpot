import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const EliminarUsuariosScreen = ({ route, navigation }) => {
  const { tdoc_user, id_user } = route.params;
  const [loading, setLoading] = useState(false);

  const handleEliminarUsuario = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(`http://192.168.1.14:3000/usuarios/${tdoc_user}/${id_user}`);

      setLoading(false);
      Alert.alert('Éxito', response.data.message);
      navigation.goBack(); // Regresar a la pantalla anterior después de eliminar el usuario
    } catch (error) {
      setLoading(false);

      if (error.response) {
        Alert.alert('Error', error.response.data.error);
      } else if (error.request) {
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        Alert.alert('Error', 'Error al realizar la solicitud');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Usuario</Text>
      <Text style={styles.confirmationText}>
        ¿Está seguro que desea eliminar este usuario?
      </Text>
      <Button
        title="Eliminar Usuario"
        onPress={handleEliminarUsuario}
        disabled={loading}
      />
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
  confirmationText: {
    marginBottom: 20,
  },
});

export default EliminarUsuariosScreen;

