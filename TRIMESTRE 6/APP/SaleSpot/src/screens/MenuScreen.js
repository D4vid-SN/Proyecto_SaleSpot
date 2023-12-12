import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Menu = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigateToScreen('Usuarios')}
      >
        <Text style={styles.buttonText}>Usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigateToScreen('Productos')}
      >
        <Text style={styles.buttonText}>Productos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4', // Fondo más claro
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Texto más oscuro
  },
  menuButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#DDD', // Borde más claro
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333', // Texto más oscuro
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;

