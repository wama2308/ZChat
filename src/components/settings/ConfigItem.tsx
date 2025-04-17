import { SPACES } from "@config/themes/themes";
import type { IConfigItemProps } from "@interfaces/config";
import Icon from "@react-native-vector-icons/ionicons";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
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
      }),
    [colors]
  );

  return (
    <TouchableOpacity style={dynamicStyles.pressable} onPress={onPress} activeOpacity={0.7}>
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.left}>
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
