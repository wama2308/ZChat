import { SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import Icon from "@react-native-vector-icons/ionicons";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ViewSettings from "./ViewSettings";

const ProfileNumber = () => {
  const { colors } = useTheme();
  console.log("color ", colors);
  // Accessing the 'colors["wama"]' property instead of 'colors.wama'
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
        backgroundColor: colors.primary,
        padding: SPACES.p1,
        borderRadius: 10,
      },
    },
    [colors]
  );
  return (
    <TouchableOpacity style={styles.pressable} onPress={() => {}} activeOpacity={0.7}>
      <ViewSettings>
        <View style={styles.container}>
          <View style={styles.left}>
            <Icon name="call-outline" size={24} color={colors.onBackground} style={styles.iconCall} />
            <Text variant="titleLarge">10-3576-4592</Text>
          </View>

          <Icon name="share-outline" size={24} color={colors.onBackground} />
        </View>
      </ViewSettings>
    </TouchableOpacity>
  );
};

export default ProfileNumber;
