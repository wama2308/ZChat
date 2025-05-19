import { type AppTheme, SPACES } from "@config/themes/themes";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import ImagePicker, { type Image } from "react-native-image-crop-picker";
import { Divider, Text, useTheme } from "react-native-paper";

// Define el tipo para las props
interface Props {
  onImageSelected: (image: Asset) => void;
  callBack: () => void;
}

// Tipo para la imagen (puedes usar el Image de la librería o tu propio tipo)
type Asset = {
  uri: string;
  width?: number;
  height?: number;
  type?: string;
  fileSize?: number;
  fileName?: string;
};

export const ImagePickerButton = ({ onImageSelected, callBack }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const LABEL_CHOOSE = t("common.label-choose");
  const LABEL_CANCEL = t("common.label-cancel");

  const mapImageToAsset = (image: Image): Asset => ({
    uri: image.path,
    width: image.width,
    height: image.height,
    type: image.mime,
    fileSize: image.size,
    fileName: image.filename,
  });

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      freeStyleCropEnabled: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.7,
      cropperChooseText: LABEL_CHOOSE,
      cropperCancelText: LABEL_CANCEL,
      mediaType: "photo",
    })
      .then((image) => {
        onImageSelected(mapImageToAsset(image));
        callBack();
      })
      .catch((error) => {
        if (error.code !== "E_PICKER_CANCELLED") {
          Alert.alert("Error", error.message || "Ocurrió un error");
        }
        callBack();
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      freeStyleCropEnabled: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.7,
      cropperChooseText: LABEL_CHOOSE,
      cropperCancelText: LABEL_CANCEL,
      mediaType: "photo",
    })
      .then((image) => {
        onImageSelected(mapImageToAsset(image));
        callBack();
      })
      .catch((error) => {
        if (error.code !== "E_PICKER_CANCELLED") {
          Alert.alert("Error", error.message || "Ocurrió un error");
        }
        callBack();
      });
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
