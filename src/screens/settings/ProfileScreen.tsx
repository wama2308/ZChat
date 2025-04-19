import EditProfile from "@components/settings/EditProfile";
import ViewSettings from "@components/settings/ViewSettings";
import { SPACES, type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  const styles = useDynamicStyles({
    container: {
      marginVertical: SPACES.m4,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: SPACES.g3,
    },
    left: {},
    image: {
      width: 70,
      height: 70,
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <ViewSettings>
        <View style={styles.content}>
          <Image source={require("../../assets/images/user-select.jpg")} style={styles.image} />
          <View style={{ flex: 1 }}>
            {/* <Text variant="titleLarge">Wilfredo</Text>
            <Text variant="titleLarge">Medina</Text> */}
            <EditProfile />
          </View>
        </View>
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
