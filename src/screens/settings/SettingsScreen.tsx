import ListViewSettings from "@components/settings/ListViewSettings";
import Profile from "@components/settings/Profile";
import ProfileNumber from "@components/settings/ProfileNumber";
import { SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { ScrollView, View } from "react-native"; // Importa ScrollView
import { useTheme } from "react-native-paper";

const SettingsScreen = () => {
  const { colors } = useTheme();
  const styles = useDynamicStyles(
    {
      content: {
        flex: 1,
        marginTop: SPACES.m3,
      },
      scrollView: {
        flex: 1,
      },
      contentContainer: {
        paddingBottom: SPACES.m3,
        flexDirection: "column",
        gap: SPACES.g3,
      },
    },
    [colors]
  );

  return (
    <View style={styles.content}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <ProfileNumber />
        <Profile />
        <ListViewSettings />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
