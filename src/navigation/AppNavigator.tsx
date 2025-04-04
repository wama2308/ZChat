import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// Importa las pantallas
import StartScreen from '../screens/start/StartScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import LoginScreen from '../screens/login/Login';

// Definir los tipos de la navegación
export type RootStackParamList = {
  Inicio: undefined;
  Registro: {userId: string}; // Parámetro opcional
  Login: {userId: string}; // Parámetro opcional
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={StartScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
