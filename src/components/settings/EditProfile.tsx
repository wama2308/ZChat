import { ImagePickerButton } from "@components/ui/ImagePickerButton";
import { SPACES } from "@config/themes/themes";
import useProfile from "@hooks/settings/useProfile";
import { Suspense, lazy, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { type Asset } from "react-native-image-picker";
import { TextInput } from "react-native-paper";
const ModalComponent = lazy(async () => await import("@components/ui/ModalComponent"));

const EditProfile = () => {
  const { t } = useTranslation();
  const { control } = useProfile();
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Suspense>
        <ModalComponent
          visible={visible}
          hideModal={hideModal}
          title={t("profile.label-edit-profile-picture")}
        >
          <ImagePickerButton onImageSelected={setSelectedImage} callBack={hideModal} />
        </ModalComponent>
      </Suspense>
      <View style={styles.content}>
        <TouchableOpacity onPress={showModal}>
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
