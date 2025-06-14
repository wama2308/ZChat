// components/ClassifyContacts.tsx
import { SPACES, type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { TClassifyContacts } from "@interfaces/config";
import Icon from "@react-native-vector-icons/ionicons";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Divider, Text, TouchableRipple, useTheme } from "react-native-paper";

interface Props {
  byClassify: TClassifyContacts;
  handleClassify: (value: TClassifyContacts) => void;
  handleOpenClassify: (value: boolean) => void;
}

const ClassifyContacts = ({ byClassify, handleClassify, handleOpenClassify }: Props) => {
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
        flex: 1,
      },
      content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      },
    },
    [colors]
  );

  const handleActions = (value: TClassifyContacts) => {
    handleClassify(value);
    handleOpenClassify(false);
  };

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={() => handleActions("byName")}>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.textOptions}>
            {t("contacts.order-by-name")}
          </Text>
          {byClassify === "byName" && (
            <Icon
              name="checkmark-outline"
              size={24}
              color={colors.white}
              style={{ position: "absolute", right: SPACES.p2 }}
            />
          )}
        </View>
      </TouchableRipple>
      <Divider bold />

      <TouchableRipple onPress={() => handleActions("byLastSeen")}>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.textOptions}>
            {t("contacts.order-last-seen")}
          </Text>
          {byClassify === "byLastSeen" && (
            <Icon
              name="checkmark-outline"
              size={24}
              color={colors.white}
              style={{ position: "absolute", right: SPACES.p2 }}
            />
          )}
        </View>
      </TouchableRipple>
    </View>
  );
};

export default ClassifyContacts;
