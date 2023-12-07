import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Inicio = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/LOGO2.png')}
        style={styles.image}
      />
      <Text style={styles.text}>
        Este software brinda a los usuarios la capacidad de registrar y monitorear las ventas de productos o servicios de manera rápida y precisa. Permite ingresar información relevante, como la descripción del producto, el precio, la cantidad vendida y los detalles del cliente. Además, ofrece la posibilidad de generar facturas o recibos automáticamente, lo que simplifica el proceso de facturación.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center', 
    marginHorizontal: '5%', 
    marginBottom: 20, 
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10, 
  },
  buttonText: {
    color: 'white',
  },
});

export default Inicio;

