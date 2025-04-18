import { SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { IConfigItemProps } from "@interfaces/config";
import Icon from "@react-native-vector-icons/ionicons";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const ConfigItem = ({
  leftIconName,
  label,
  onPress,
  showRightArrow = true,
  rightIconName,
  rightIconColor,
}: IConfigItemProps) => {
  const { colors } = useTheme();
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
    },
    [colors]
  );

  return (
    <TouchableOpacity style={styles.pressable} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Icon name={leftIconName} size={24} color={colors.onBackground} />
          <Text>{label}</Text>
        </View>

        {showRightArrow && (
          <Icon
            name={rightIconName || "chevron-forward-outline"}
            size={24}
            color={rightIconColor || colors.onBackground}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ConfigItem;
