import { type AppTheme, SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { type AssetImageCrop } from "@interfaces/config";
import { useTranslation } from "react-i18next";
import { Alert, TouchableOpacity, View } from "react-native";
import ImagePicker, { type Image } from "react-native-image-crop-picker";
import { Divider, Text, useTheme } from "react-native-paper";

// Define el tipo para las props
interface Props {
  titleId: string;
  onImageSelected: (image: AssetImageCrop) => void;
  callBack: () => void;
}

// Tipo para la imagen (puedes usar el Image de la librería o tu propio tipo)

export const ImagePickerButton = ({ titleId, onImageSelected, callBack }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const LABEL_CHOOSE = t("common.label-choose");
  const LABEL_CANCEL = t("common.label-cancel");

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
      },
    },
    [colors]
  );

  const mapImageToAsset = (image: Image): AssetImageCrop => ({
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
      <Text variant="titleSmall" style={styles.textTitle}>
        {titleId}
      </Text>
      <Divider bold />
      <TouchableOpacity onPress={openCamera}>
        <Text style={styles.textOptions} variant="titleLarge">
          {t("common.label-take-photo")}
        </Text>
      </TouchableOpacity>
      <Divider bold />
      <TouchableOpacity onPress={openGallery}>
        <Text style={styles.textOptions} variant="titleLarge">
          {t("common.label-select-photo")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
