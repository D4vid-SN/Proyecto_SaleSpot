// UsuariosScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UsuariosScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Usuarios</Text>
      <Button
        title="Agregar Usuarios"
        onPress={() => navigation.navigate('AgregarUsuarios')}
      />
      <Button
        title="Perfiles de Usuarios"
        onPress={() => navigation.navigate('PerfilesUsuarios')}
      />
    </View>
  );
};



export default UsuariosScreen;
