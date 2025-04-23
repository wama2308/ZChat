import { ImagePickerButton } from "@components/ui/ImagePickerButton";
import { SPACES } from "@config/themes/themes";
import { type FormValuesEditProfile } from "@hooks/settings/useProfile";
import { Suspense, lazy } from "react";
import { type Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Asset } from "react-native-image-picker";
import { TextInput } from "react-native-paper";
const ModalComponent = lazy(async () => await import("@components/ui/ModalComponent"));

interface Props {
  control: Control<FormValuesEditProfile, any, FormValuesEditProfile>;
  modalShow: boolean;
  selectedImage: Asset | null;
  handleModalShow: (value: boolean) => void;
  handleSelectedImage: (value: Asset | null) => void;
}

const EditProfile = ({ control, modalShow, selectedImage, handleModalShow, handleSelectedImage }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Suspense>
        <ModalComponent
          visible={modalShow}
          hideModal={() => handleModalShow(false)}
          title={t("profile.label-edit-profile-picture")}
        >
          <ImagePickerButton onImageSelected={handleSelectedImage} callBack={() => handleModalShow(false)} />
        </ModalComponent>
      </Suspense>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => handleModalShow(true)}>
          <ImageBackground
            source={
              selectedImage?.uri ? { uri: selectedImage.uri } : require("../../assets/images/user-select.jpg")
            }
            style={styles.image}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>
                {selectedImage?.uri ? t("common.label-edit") : t("common.label-add")}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                autoCapitalize="none"
                label={t("form.label-name")}
                value={value}
                onChangeText={onChange}
                style={{ backgroundColor: "transparent" }}
              />
            )}
          />
          <Controller
            control={control}
            name="lastname"
            render={({ field: { onChange, value } }) => (
              <TextInput
                autoCapitalize="none"
                label={t("form.label-lastname")}
                value={value}
                onChangeText={onChange}
                style={{ backgroundColor: "transparent" }}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACES.g3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: 100,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  overlayText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});

export default EditProfile;
