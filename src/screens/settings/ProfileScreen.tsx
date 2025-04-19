import EditProfile from "@components/settings/EditProfile";
import ViewSettings from "@components/settings/ViewSettings";
import { SPACES, type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  const styles = useDynamicStyles({
    container: {
      marginVertical: SPACES.m4,
    },
  });

  return (
    <View style={styles.container}>
      <ViewSettings>
        <EditProfile />
      </ViewSettings>
      <Divider bold />
      <ViewSettings>
        <Text variant="titleLarge" style={{ color: colors.blueBootstrap }}>
          {t("profile.label-edit-data-perfil")}
        </Text>
      </ViewSettings>
    </View>
  );
};

export default ProfileScreen;
