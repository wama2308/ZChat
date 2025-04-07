import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

// Importa las pantallas
import StartScreen from '@screens/start/StartScreen';
import RegisterScreen from '@screens/register/RegisterScreen';
import LoginScreen from '@screens/login/Login';

// Definir los tipos de la navegación
export type RootStackParamList = {
  Inicio: undefined;
  Registro: {userId: string}; // Parámetro opcional
  Login: {userId: string}; // Parámetro opcional
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const {t} = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={StartScreen}
          options={{title: t('start')}}
        />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
