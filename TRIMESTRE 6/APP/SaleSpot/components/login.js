import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Login = () => {
  const [documentoType, setDocumentoType] = useState('Cédula');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const requestData = {
        tdoc_user: documentoType,
        id_user: numeroDocumento,
      };

      const response = await axios.post('http://localhost:3000', requestData);
      console.log('Respuesta del servidor:', response.data);

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <View style={styles.formGroup}>
          <Text>Tipo de Documento:</Text>
          <Picker
            selectedValue={documentoType}
            onValueChange={(itemValue) => setDocumentoType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Cédula" value="Cédula" />
            <Picker.Item label="Tarjeta de Identidad" value="Tarjeta de Identidad" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text>Número de Documento:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNumeroDocumento(text)}
            value={numeroDocumento}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Contraseña:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default Login;
