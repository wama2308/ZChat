import AuthLayout from "@components/AuthLayout";
import { SPACES } from "@config/themes/themes";
import useAuthRegister from "@hooks/auth/useAuthRegister";
import Icon from "@react-native-vector-icons/ionicons";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

const RegisterScreen = () => {
  const { t } = useTranslation();
  const {
    control,
    showPassword,
    showConfirmPassword,
    errors,
    handleSubmit,
    handleShowPassword,
    handleShowConfirmPassword,
  } = useAuthRegister();

  // const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  return (
    <AuthLayout contentCenter={false}>
      {/* {selectedImage?.uri && <Image source={{ uri: selectedImage.uri }} style={styles.image} />} */}
      <Text variant="displaySmall">{t("profile.your-profile")}</Text>
      <View style={styles.content}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                autoCapitalize="none"
                label={t("form.label-user-name")}
                value={value}
                onChangeText={onChange}
                error={!!errors.username?.message}
              />
              {!!errors.username?.message && (
                <HelperText type="error" visible={!!errors.username?.message}>
                  {errors.username?.message}
                </HelperText>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
          }}
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
                      <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#666" />
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
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                label={t("form.label-confirm-password")}
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showConfirmPassword}
                keyboardType="default"
                autoComplete="off"
                textContentType="none" // iOS
                importantForAutofill="no" // Android
                error={!!errors.confirmPassword?.message}
                right={
                  <TextInput.Icon
                    icon={() => (
                      <Icon
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color="#666"
                      />
                    )}
                    onPress={handleShowConfirmPassword}
                  />
                }
                left={
                  <TextInput.Icon icon={() => <Icon name="lock-closed-outline" size={24} color="#666" />} />
                }
              />
              {!!errors.confirmPassword?.message && (
                <HelperText type="error" visible={!!errors.confirmPassword?.message}>
                  {errors.confirmPassword?.message}
                </HelperText>
              )}
            </View>
          )}
        />
      </View>
      <Button theme={{ roundness: 1 }} mode="contained" onPress={handleSubmit} style={{ width: "100%" }}>
        {t("auth.register")}
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
    gap: SPACES.g1,
    marginTop: SPACES.m3,
  },
});

export default RegisterScreen;
