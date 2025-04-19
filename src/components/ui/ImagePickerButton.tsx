import { type AppTheme, SPACES } from "@config/themes/themes";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  type Asset,
  type ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { Divider, Text, useTheme } from "react-native-paper";

interface Props {
  onImageSelected: (image: Asset) => void;
  callBack: () => void;
}

export const ImagePickerButton = ({ onImageSelected, callBack }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log("Usuario canceló la acción");
    } else if (response.errorCode) {
      Alert.alert("Error", response.errorMessage || "Ocurrió un error");
    } else if (response.assets && response.assets.length > 0) {
      onImageSelected(response.assets[0]);
      callBack();
    }
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: "photo",
        cameraType: "back",
        saveToPhotos: true,
      },
      handleResponse
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1,
      },
      handleResponse
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera}>
        <Text style={{ color: colors.blueBootstrap }} variant="titleLarge">
          {t("common.label-take-photo")}
        </Text>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity onPress={openGallery}>
        <Text style={{ color: colors.blueBootstrap }} variant="titleLarge">
          {t("common.label-select-photo")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: SPACES.g2,
  },
});
