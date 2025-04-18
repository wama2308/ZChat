import { type AppTheme, SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import Icon from "@react-native-vector-icons/ionicons";
import { useTranslation } from "react-i18next";
import { Alert, Share, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ViewSettings from "./ViewSettings";

const onShare = async () => {
  try {
    const result = await Share.share({
      message: "10-3576-4592",
      title: "Copiar número", //
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

const ProfileNumber = () => {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation();

  const styles = useDynamicStyles(
    {
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
      iconCall: {
        backgroundColor: colors.brightBlue,
        padding: SPACES.p1,
        borderRadius: 10,
      },
      iconShare: {
        backgroundColor: colors.background,
        padding: SPACES.p1,
        borderRadius: 50,
      },
    },
    [colors]
  );
  return (
    <TouchableOpacity style={styles.pressable} onPress={() => {}} activeOpacity={0.7}>
      <ViewSettings>
        <View style={styles.container}>
          <View style={styles.left}>
            <Icon name="call-outline" size={32} color={colors.white} style={styles.iconCall} />
            <View>
              <Text variant="titleSmall" style={{ color: colors.onSurface }}>
                {t("profile.label-your-private-number")}
              </Text>
              <Text variant="titleLarge">10-3576-4592</Text>
            </View>
          </View>

          <Icon
            name="share-outline"
            size={32}
            color={colors.brightBlue}
            style={styles.iconShare}
            onPress={onShare}
          />
        </View>
      </ViewSettings>
    </TouchableOpacity>
  );
};

export default ProfileNumber;
