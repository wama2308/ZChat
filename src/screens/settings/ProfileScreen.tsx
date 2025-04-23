import EditProfile from "@components/settings/EditProfile";
import HeaderProfile from "@components/settings/HeaderProfile";
import ViewSettings from "@components/settings/ViewSettings";
import { SPACES, type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import useProfile from "@hooks/settings/useProfile";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const { control, modalShow, selectedImage, hasChanges, handleModalShow, handleSelectedImage, reset } =
    useProfile();

  const styles = useDynamicStyles({
    container: {
      marginVertical: SPACES.m4,
    },
  });

  return (
    <>
      <HeaderProfile hasChanges={hasChanges} reset={reset} />
      <View style={styles.container}>
        <ViewSettings>
          <EditProfile
            control={control}
            modalShow={modalShow}
            selectedImage={selectedImage}
            handleModalShow={handleModalShow}
            handleSelectedImage={handleSelectedImage}
          />
        </ViewSettings>
        <Divider bold />
        <ViewSettings>
          <Text variant="titleLarge" style={{ color: colors.blueBootstrap }}>
            {t("profile.label-edit-data-perfil")}
          </Text>
        </ViewSettings>
      </View>
    </>
  );
};

export default ProfileScreen;
