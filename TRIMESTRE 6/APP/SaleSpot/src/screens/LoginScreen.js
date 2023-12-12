import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
  const [tdoc, setTdoc] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Cargar tipos de documento en tiempo real
    cargarTiposDocumento();
  }, []);

  const cargarTiposDocumento = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:3000/tipoDocumento');
      setTiposDocumento(response.data);
    } catch (error) {
      console.error('Error al cargar tipos de documento:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.14:3000/login', {
        tdoc,
        id,
        password,
      });

      const token = response.data.token;

      // Aquí podrías almacenar el token en AsyncStorage o en el estado global de la aplicación

      // Redirigir a la pantalla de menú
      navigation.navigate('Menu');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Error al realizar la solicitud');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.formGroup}>
        <Text>Tipo de Documento:</Text>
        <Picker
          selectedValue={tdoc}
          style={styles.input}
          onValueChange={(itemValue) => setTdoc(itemValue)}
        >
          <Picker.Item label="Selecciona un tipo de documento" value="" />
          {tiposDocumento.map((tipo) => (
            <Picker.Item key={tipo.tdoc} label={tipo.desc_tdoc} value={tipo.tdoc} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text>Número de Documento:</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={(text) => setId(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
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
  formGroup: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;





