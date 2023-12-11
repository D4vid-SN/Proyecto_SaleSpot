import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsuariosScreen from './src/screens/UsuariosScreen';
import AgregarUsuariosScreen from './src/screens/AgregarUsuariosScreen';
import PerfilesUsuariosScreen from './src/screens/PerfilesUsuariosScreen';
import EditarUsuariosScreen from './src/screens/EditarUsuariosScreen';
import EliminarUsuariosScreen from './src/screens/EliminarUsuariosScreen';
import ProductosScreen from './src/screens/ProductosScreen';
import AgregarProductosScreen from './src/screens/AgregarProductosScreen';
import EditarProductosScreen from './src/screens/EditarProductosScreen';
import EliminarProductosScreen from './src/screens/EliminarProductosScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Usuarios">
        <Stack.Screen name="Usuarios" component={UsuariosScreen} />
        <Stack.Screen name="AgregarUsuarios" component={AgregarUsuariosScreen} />
        <Stack.Screen name="PerfilesUsuarios" component={PerfilesUsuariosScreen} />
        <Stack.Screen name="EditarUsuariosScreen" component={EditarUsuariosScreen} />
        <Stack.Screen name="EliminarUsuariosScreen" component={EliminarUsuariosScreen} />
        <Stack.Screen name="Productos" component={ProductosScreen} />
        <Stack.Screen name="AgregarProductos" component={AgregarProductosScreen} />
        <Stack.Screen name="EditarProductos" component={EditarProductosScreen} />
        <Stack.Screen name="EliminarProductos" component={EliminarProductosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


