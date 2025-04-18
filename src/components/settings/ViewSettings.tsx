import { SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { type ReactNode } from "react"; // Importa useMemo
import { View } from "react-native";
import { useTheme } from "react-native-paper";

interface Props {
  children: ReactNode;
}
const ViewSettings = ({ children }: Props) => {
  const { colors } = useTheme();
  const styles = useDynamicStyles(
    {
      container: {
        backgroundColor: colors.onSecondary,
        padding: SPACES.p2,
      },
    },
    [colors]
  );

  return <View style={styles.container}>{children}</View>;
};

export default ViewSettings;
