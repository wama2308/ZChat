import { SPACES } from "@config/themes/themes";
import { type ReactNode, useMemo } from "react"; // Importa useMemo
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

interface Props {
  children: ReactNode;
}
const ViewSettings = ({ children }: Props) => {
  const { colors } = useTheme();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.onSecondary,
          padding: SPACES.p2,
        },
      }),
    [colors]
  );
  return <View style={dynamicStyles.container}>{children}</View>;
};

export default ViewSettings;
