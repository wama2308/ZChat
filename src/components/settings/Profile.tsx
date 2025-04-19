import { type AppTheme, SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { type RootStackParamListSettings } from "@navigation/SettingsNavigator";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Image, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ViewSettings from "./ViewSettings";

const Profile = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListSettings>>();

  const styles = useDynamicStyles({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: SPACES.g2,
    },
    pressable: {
      width: "100%",
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 100,
    },
  });

  return (
    <TouchableOpacity
      style={styles.pressable}
      onPress={() => navigation.navigate("ProfileSettings")}
      activeOpacity={0.7}
    >
      <ViewSettings>
        <View style={styles.left}>
          <Image source={require("../../assets/images/user-select.jpg")} style={styles.image} />

          <View>
            <Text variant="titleSmall" style={{ color: colors.outline }}>
              {t("profile.your-profile")}
            </Text>
            <Text variant="titleLarge">Wilfredo Medina</Text>
          </View>
        </View>
      </ViewSettings>
    </TouchableOpacity>
  );
};

export default Profile;
