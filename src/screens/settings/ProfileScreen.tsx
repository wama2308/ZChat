import EditProfile from "@components/settings/EditProfile";
import HeaderProfile from "@components/settings/HeaderProfile";
import ViewSettings from "@components/settings/ViewSettings";
import { SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import useProfile from "@hooks/settings/useProfile";
import { View } from "react-native";
import { Divider } from "react-native-paper";

const ProfileScreen = () => {
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
      </View>
    </>
  );
};

export default ProfileScreen;
