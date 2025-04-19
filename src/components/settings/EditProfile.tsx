import useProfile from "@hooks/settings/useProfile";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

const EditProfile = () => {
  const { t } = useTranslation();
  const { control } = useProfile();
  return (
    <View style={{ width: "100%" }}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoCapitalize="none"
            label={t("form.label-name")}
            value={value}
            onChangeText={onChange}
            style={{ backgroundColor: "transparent" }}
          />
        )}
      />
      <Controller
        control={control}
        name="lastname"
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoCapitalize="none"
            label={t("form.label-lastname")}
            value={value}
            onChangeText={onChange}
            style={{ backgroundColor: "transparent" }}
          />
        )}
      />
    </View>
  );
};

export default EditProfile;
