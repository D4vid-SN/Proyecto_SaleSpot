import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert,  Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const EditarProductosScreen = ({ route, navigation }) => {
  const { producto } = route.params;

  const [descProd, setDescProd] = useState(producto.desc_prod);
  const [tipoProd, setTipoProd] = useState(producto.tipo_prod);
  const [valorProd, setValorProd] = useState(producto.valor_prod.toString());
  const [estadoProd, setEstadoProd] = useState(Boolean(producto.estado_prod));
  const [loading, setLoading] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [exitoMensaje, setExitoMensaje] = useState('');
  const [tiposProducto, setTiposProducto] = useState([]);

  useEffect(() => {
    cargarTiposProducto();
  }, []);

  const cargarTiposProducto = async () => {
    try {
      const response = await axios.get('http://192.168.20.20:3000/tipoProducto');
      setTiposProducto(response.data);
    } catch (error) {
      console.error('Error al cargar tipos de producto:', error);
      Alert.alert('Error', 'No se pudo cargar la información de tipos de producto');
    }
  };

  const validarCamposObligatorios = () => {
    // Validar que la descripción del producto no esté vacía
    if (!descProd.trim()) {
      setErrorMensaje('La descripción del producto es obligatoria.');
      return false;
    }
  
    // Validar que el tipo del producto no esté vacío
    if (typeof tipoProd === 'string' && !tipoProd.trim()) {
      setErrorMensaje('El tipo del producto es obligatorio.');
      return false;
    }
  
    // Validar que el valor del producto sea un número
    if (isNaN(valorProd)) {
      setErrorMensaje('El valor del producto debe ser un número.');
      return false;
    }
  
    setErrorMensaje('');
    return true;
  };
  

  const handleActualizarProducto = async () => {
    if (!validarCamposObligatorios()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(`http://192.168.1.14:3000/producto/${producto.id_prod}`, {
        desc_prod: descProd,
        tipo_prod: tipoProd,
        valor_prod: parseFloat(valorProd),
        estado_prod: estadoProd,
      });

      setLoading(false);
      setExitoMensaje('Producto actualizado exitosamente.');
      setTimeout(() => setExitoMensaje(''), 5000); // Desaparecer el mensaje después de 5 segundos

      Alert.alert('Éxito', response.data.message);
      navigation.goBack(); // Volver a la pantalla anterior después de la actualización
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
      <Text style={styles.title}>Editar Producto</Text>
      <View style={styles.formGroup}>
        <Text>Descripción del Producto (Obligatorio):</Text>
        <TextInput
          style={styles.input}
          value={descProd}
          onChangeText={setDescProd}
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Tipo del Producto (Obligatorio):</Text>
        <Picker
          selectedValue={tipoProd}
          style={styles.input}
          onValueChange={(itemValue) => setTipoProd(itemValue)}
        >
          <Picker.Item label="Selecciona un tipo de producto (Obligatorio)" value="" />
          {tiposProducto.map((tipo) => (
            <Picker.Item key={tipo.id_tipo_prod} label={tipo.tipo_prod} value={tipo.id_tipo_prod} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text>Valor del Producto (Obligatorio):</Text>
        <TextInput
          style={styles.input}
          value={valorProd}
          onChangeText={(text) => setValorProd(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Estado:</Text>
        <Switch
          value={estadoProd}
          onValueChange={(value) => setEstadoProd(value)}
        />
      </View>
      {errorMensaje !== '' && <Text style={styles.errorText}>{errorMensaje}</Text>}
      {exitoMensaje !== '' && <Text style={styles.exitoText}>{exitoMensaje}</Text>}
      <Button title="Actualizar Producto" onPress={handleActualizarProducto} disabled={loading} />
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
});

export default EditarProductosScreen;

