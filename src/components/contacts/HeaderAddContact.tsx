import { SPACES, type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { FormValuesAddContact } from "@hooks/contacts/useAddContacts";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import { Header, HeaderBackButton } from "@react-navigation/elements";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { type BaseSyntheticEvent } from "react";
import type { UseFormReset } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Platform, TouchableOpacity } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

interface Props {
  title: string;
  hasChanges: boolean;
  reset: UseFormReset<FormValuesAddContact>;
  action: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  loading: boolean;
}

const HeaderAddContact = ({ title, hasChanges, reset, action, loading }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();

  const styles = useDynamicStyles({
    touchableText: {
      marginHorizontal: Platform.OS === "ios" ? SPACES.m1 : SPACES.m2,
    },
    text: {
      color: colors.brightBlue,
    },
  });
  return (
    <Header
      title={title}
      headerTitleAlign="center"
      headerLeft={() =>
        hasChanges ? (
          <TouchableOpacity style={styles.touchableText} onPress={() => reset()}>
            <Text variant="titleMedium" style={styles.text}>
              {t("common.label-cancel")}
            </Text>
          </TouchableOpacity>
        ) : (
          <HeaderBackButton onPress={() => navigation.goBack()} tintColor={colors.backButtonHeader} />
        )
      }
      headerRight={() =>
        hasChanges ? (
          <TouchableOpacity style={styles.touchableText} onPress={() => action()}>
            {loading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <Text variant="titleMedium" style={styles.text}>
                {t("common.label-ok")}
              </Text>
            )}
          </TouchableOpacity>
        ) : undefined
      }
    />
  );
};

export default HeaderAddContact;
