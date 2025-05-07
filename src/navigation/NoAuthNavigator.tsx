import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import LoginScreen from "@screens/login/LoginScreen";
import RegisterScreen from "@screens/register/RegisterScreen";
import StartScreen from "@screens/start/StartScreen";

export type NoAuthtStackParamList = {
  Start: undefined;
  Register: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<NoAuthtStackParamList>();

const NoAuthNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerTitle: "", headerBackTitle: t("common.label-back") }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: "", headerBackTitle: t("common.label-back") }}
      />
    </Stack.Navigator>
  );
};

export default NoAuthNavigator;
