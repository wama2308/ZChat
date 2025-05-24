// components/OptionsInvitations.tsx
import { SPACES, type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Divider, Text, TouchableRipple, useTheme } from "react-native-paper";

const OptionsInvitations = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  const styles = useDynamicStyles(
    {
      container: {},
      textTitle: {
        textAlign: "center",
        padding: SPACES.p2,
        color: colors.outline,
        fontWeight: "bold",
      },
      textOptions: {
        textAlign: "center",
        padding: SPACES.p2,
      },
    },
    [colors]
  );

  return (
    <View style={styles.container}>
      <Text variant="titleSmall" style={styles.textTitle}>
        {t("contacts.send-invitation")}
      </Text>
      <Divider bold />
      <TouchableRipple onPress={() => {}}>
        <Text variant="titleLarge" style={styles.textOptions}>
          {t("contacts.invitation-sms")}
        </Text>
      </TouchableRipple>
      <Divider bold />

      <TouchableRipple onPress={() => {}}>
        <Text variant="titleLarge" style={styles.textOptions}>
          {t("common.label-share")}
        </Text>
      </TouchableRipple>
    </View>
  );
};

export default OptionsInvitations;
