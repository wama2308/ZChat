import AuthLayout from "@components/AuthLayout";
import { SPACES } from "@config/themes/themes";
import useAuthLogin from "@hooks/auth/useAuthLogin";
import Icon from "@react-native-vector-icons/ionicons";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

const LoginScreen = () => {
  const { t } = useTranslation();
  const { control, showPassword, errors, handleSubmit, handleShowPassword } = useAuthLogin();
  return (
    <AuthLayout contentCenter={false}>
      <View style={styles.content}>
        <Text style={{ textAlign: "center" }} variant="displaySmall">
          {t("auth.login")}
        </Text>
        <Text style={{ marginVertical: SPACES.m4, textAlign: "center" }} variant="titleMedium">
          {t("auth.text-informative-login")}
        </Text>
        <View style={{ gap: SPACES.g1 }}>
          <Controller
            control={control}
            name="userNameNumberZChat"
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  autoCapitalize="none"
                  label={`${t("form.label-user-name")} / ${t("form.label-number-zchat")}`}
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.userNameNumberZChat?.message}
                />
                {!!errors.userNameNumberZChat?.message && (
                  <HelperText type="error" visible={!!errors.userNameNumberZChat?.message}>
                    {errors.userNameNumberZChat?.message}
                  </HelperText>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  key={showPassword ? "text" : "password"}
                  label={t("form.label-password")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  keyboardType="default"
                  autoComplete="off"
                  textContentType="none" // iOS
                  importantForAutofill="no" // Android
                  error={!!errors.password?.message}
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <Icon
                          name={showPassword ? "eye-off-outline" : "eye-outline"}
                          size={24}
                          color="#666"
                        />
                      )}
                      onPress={handleShowPassword}
                    />
                  }
                  left={
                    <TextInput.Icon icon={() => <Icon name="lock-closed-outline" size={24} color="#666" />} />
                  }
                />
                {!!errors.password?.message && (
                  <HelperText type="error" visible={!!errors.password?.message}>
                    {errors.password?.message}
                  </HelperText>
                )}
              </View>
            )}
          />
          <Button
            theme={{ roundness: 1 }}
            mode="contained"
            onPress={handleSubmit}
            style={{ width: "100%", marginTop: SPACES.m2 }}
          >
            {t("common.label-continue")}
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    gap: SPACES.g5,
  },
  content: {
    width: "100%",
    gap: SPACES.g1,
    marginTop: SPACES.m3,
  },
});

export default LoginScreen;
