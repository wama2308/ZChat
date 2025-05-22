import { SPACES, type AppTheme } from "@config/themes/themes";
import Icon from "@react-native-vector-icons/ionicons";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Text, TextInput, TouchableRipple, useTheme } from "react-native-paper";

interface Props {
  item: string;
  index: number;
  activeIndex: number | null;
  animations: Animated.Value[];
  toggleDelete: (index: number) => void;
  slideOut: (index: number) => void;
  handleChangeNumber: (text: string, index: number) => void;
  handleRemoveNumber: (index: number) => void;
}

const ItemAddDeleteNumber = ({
  item,
  index,
  activeIndex,
  animations,
  toggleDelete,
  slideOut,
  handleChangeNumber,
  handleRemoveNumber,
}: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  const translateX = animations[index].interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  const deleteButtonOpacity = animations[index];

  return (
    <TouchableWithoutFeedback onPress={() => activeIndex !== null && slideOut(activeIndex)}>
      <View style={styles.numberContainer}>
        <Animated.View style={[styles.numberRow, { transform: [{ translateX }] }]}>
          <TouchableOpacity onPress={() => toggleDelete(index)}>
            <Icon name="remove-outline" size={24} color={colors.white} style={styles.iconDelete} />
          </TouchableOpacity>

          <TextInput
            label={t("common.label-number")}
            value={item}
            onChangeText={(text) => handleChangeNumber(text, index)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
            right={
              item ? (
                <TextInput.Icon
                  icon={() => (
                    <Icon
                      name={"close-outline"}
                      size={20}
                      color="#000000"
                      style={{ backgroundColor: colors.outline, borderRadius: 30 }}
                    />
                  )}
                  onPress={() => handleChangeNumber("", index)}
                />
              ) : null
            }
          />
        </Animated.View>

        <Animated.View style={[styles.deleteButton, { opacity: deleteButtonOpacity }]}>
          <TouchableRipple style={[styles.deleteButtonInner]} onPress={() => handleRemoveNumber(index)}>
            <Text style={styles.deleteButtonText}>{t("common.label-delete")}</Text>
          </TouchableRipple>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    overflow: "hidden",
    marginBottom: SPACES.g1,
    flexDirection: "row",
    alignItems: "center",
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACES.g2,
    backgroundColor: "transparent",
    flex: 1,
  },
  iconDelete: {
    backgroundColor: "red",
    borderRadius: 30,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  deleteButtonInner: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    height: "auto",
    backgroundColor: "red",
  },
  deleteButtonText: {
    color: "white",
  },
});

export default ItemAddDeleteNumber;
