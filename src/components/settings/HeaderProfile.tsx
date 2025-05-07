import { SPACES, type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { FormValuesEditProfile } from "@hooks/settings/useProfile";
import { type RootStackParamListSettings } from "@navigation/SettingsNavigator";
import { Header, HeaderBackButton } from "@react-navigation/elements";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import type { UseFormReset } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
  hasChanges: boolean;
  reset: UseFormReset<FormValuesEditProfile>;
}

const HeaderProfile = ({ hasChanges, reset }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListSettings>>();

  const styles = useDynamicStyles({
    touchableText: {
      marginHorizontal: SPACES.m1,
    },
    text: {
      color: colors.brightBlue,
    },
  });
  return (
    <Header
      title={hasChanges ? t("profile.label-edit-profile") : t("profile.label-profile")}
      headerLeft={() =>
        hasChanges ? (
          <TouchableOpacity style={styles.touchableText} onPress={() => reset()}>
            <Text style={styles.text}>{t("common.label-cancel")}</Text>
          </TouchableOpacity>
        ) : (
          <HeaderBackButton onPress={() => navigation.goBack()} />
        )
      }
      headerRight={() =>
        hasChanges ? (
          <TouchableOpacity style={styles.touchableText}>
            <Text style={styles.text}>{t("common.label-ok")}</Text>
          </TouchableOpacity>
        ) : undefined
      }
    />
  );
};

export default HeaderProfile;
