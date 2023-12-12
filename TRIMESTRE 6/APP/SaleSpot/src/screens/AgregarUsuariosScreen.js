import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const AgregarUsuariosScreen = () => {
  const [tdocUser, setTdocUser] = useState('');
  const [idUser, setIdUser] = useState('');
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [estado, setEstado] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [exitoMensaje, setExitoMensaje] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    cargarTiposDocumento();
    cargarRoles();
  }, []);

  const cargarTiposDocumento = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:3000/tipoDocumento');
      setTiposDocumento(response.data);
    } catch (error) {
      console.error('Error al cargar tipos de documento:', error);
    }
  };

  const cargarRoles = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:3000/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error al cargar roles:', error);
    }
  };

  const validarCamposObligatorios = () => {
    // Validar que el tipo de documento sea seleccionado
    if (!tdocUser) {
      setErrorMensaje('Tipo de Documento es obligatorio.');
      return false;
    }

    // Validar que el ID de Usuario sea un número
    if (!/^\d+$/.test(idUser)) {
      setErrorMensaje('ID de Usuario debe ser un número.');
      return false;
    }

    // Validar que el Primer Nombre no contenga números
    if (!/^[A-Za-z]+$/.test(nombre1)) {
      setErrorMensaje('Primer Nombre solo debe contener letras.');
      return false;
    }

    // Validar que el Segundo Nombre solo contenga letras o esté vacío
    if (nombre2 && !/^[A-Za-z]+$/.test(nombre2)) {
      setErrorMensaje('Segundo Nombre solo debe contener letras o estar vacío.');
      return false;
    }

    // Validar que el Primer Apellido no contenga números
    if (!/^[A-Za-z]+$/.test(apellido1)) {
      setErrorMensaje('Primer Apellido solo debe contener letras.');
      return false;
    }

    // Validar que el Segundo Apellido solo contenga letras o esté vacío
    if (apellido2 && !/^[A-Za-z]+$/.test(apellido2)) {
      setErrorMensaje('Segundo Apellido solo debe contener letras o estar vacío.');
      return false;
    }

    // Validar que el email tenga un formato válido
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMensaje('Formato de correo electrónico inválido.');
      return false;
    }

    // Validar que el rol sea seleccionado
    if (!rol) {
      setErrorMensaje('Rol es obligatorio.');
      return false;
    }

    setErrorMensaje('');
    return true;
  };

  const handleCrearUsuario = async () => {
    if (!validarCamposObligatorios()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('http://192.168.1.14:3000/usuarios', {
        tdoc_user: tdocUser,
        id_user: idUser,
        nombre_1: nombre1,
        nombre_2: nombre2,
        apellido_1: apellido1,
        apellido_2: apellido2,
        email: email,
        rol: rol,
        estado: estado,
      });

      setLoading(false);

      // Almacena la contraseña generada automáticamente en el estado
      setPassword(response.data.password);

      setExitoMensaje('Usuario creado exitosamente.');
      setTimeout(() => setExitoMensaje(''), 5000); // Desaparecer el mensaje después de 5 segundos

      Alert.alert('Éxito', response.data.message);
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
      <Text style={styles.title}>Crear Nuevo Usuario</Text>
      <View style={styles.formGroup}>
        <Text>Tipo de Documento (Obligatorio):</Text>
        <Picker
          selectedValue={tdocUser}
          style={styles.input}
          onValueChange={(itemValue) => setTdocUser(itemValue)}
        >
          <Picker.Item label="Selecciona un tipo de documento (Obligatorio)" value="" />
          {tiposDocumento.map((tipo) => (
            <Picker.Item key={tipo.tdoc} label={tipo.desc_tdoc} value={tipo.tdoc} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text>ID de Usuario (Obligatorio):</Text>
        <TextInput
          style={styles.input}
          value={idUser}
          onChangeText={setIdUser}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Primer Nombre (Obligatorio):</Text>
        <TextInput
          style={styles.input}
          value={nombre1}
          onChangeText={setNombre1}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Segundo Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre2}
          onChangeText={setNombre2}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Primer Apellido (Obligatorio):</Text>
        <TextInput
          style={styles.input}
          value={apellido1}
          onChangeText={setApellido1}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Segundo Apellido:</Text>
        <TextInput
          style={styles.input}
          value={apellido2}
          onChangeText={setApellido2}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Email (Obligatorio):</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Rol (Obligatorio):</Text>
        <Picker
          selectedValue={rol}
          style={styles.input}
          onValueChange={(itemValue) => setRol(itemValue)}
        >
          <Picker.Item label="Selecciona un rol (Obligatorio)" value="" />
          {roles.map((rol) => (
            <Picker.Item key={rol.id_rol} label={rol.desc_rol} value={rol.id_rol} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text>Estado:</Text>
        <Switch
          value={estado}
          onValueChange={(value) => setEstado(value)}
        />
      </View>
      {errorMensaje !== '' && <Text style={styles.errorText}>{errorMensaje}</Text>}
      {exitoMensaje !== '' && <Text style={styles.exitoText}>{exitoMensaje}</Text>}
      {password !== '' && (
        <Text style={styles.passwordText}>{`Contraseña generada: ${password}`}</Text>
      )}
      <Button title="Crear Usuario" onPress={handleCrearUsuario} disabled={loading} />
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
  exitoText: {
    color: 'green',
    marginBottom: 10,
  },
  passwordText: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default AgregarUsuariosScreen;








