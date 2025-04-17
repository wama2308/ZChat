import ListViewSettings from "@components/settings/ListViewSettings";
import { SPACES } from "@config/themes/themes";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native"; // Importa ScrollView
import { useTheme } from "react-native-paper";

const SettingsScreen = () => {
  const { colors } = useTheme();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
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
      }),
    [colors]
  );

  return (
    <View style={dynamicStyles.content}>
      <ScrollView style={dynamicStyles.scrollView} contentContainerStyle={dynamicStyles.contentContainer}>
        <ListViewSettings />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
