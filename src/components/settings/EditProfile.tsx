import { ImagePickerButton } from "@components/ui/ImagePickerButton";
import ModalComponent from "@components/ui/ModalComponent";
import { type AppTheme, SPACES } from "@config/themes/themes";
import { type FormValuesEditProfile } from "@hooks/settings/useProfile";
import { type Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import type { Asset } from "react-native-image-picker";
import { Text, TextInput, useTheme } from "react-native-paper";

interface Props {
  control: Control<FormValuesEditProfile, any, FormValuesEditProfile>;
  modalShow: boolean;
  selectedImage: Asset | null;
  handleModalShow: (value: boolean) => void;
  handleSelectedImage: (value: Asset | null) => void;
}

const EditProfile = ({ control, modalShow, selectedImage, handleModalShow, handleSelectedImage }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  return (
    <>
      {modalShow && (
        <ModalComponent
          visible={modalShow}
          hideModal={() => handleModalShow(false)}
          title={t("profile.label-edit-profile-picture")}
        >
          <ImagePickerButton onImageSelected={handleSelectedImage} callBack={() => handleModalShow(false)} />
        </ModalComponent>
      )}
      <View style={styles.content}>
        <TouchableOpacity style={{ gap: SPACES.g1 }}>
          <Image
            source={
              selectedImage?.uri ? { uri: selectedImage.uri } : require("../../assets/images/user-select.jpg")
            }
            style={styles.image}
          />
          <TouchableOpacity onPress={() => handleModalShow(true)}>
            <Text variant="titleMedium" style={[{ color: colors.blueBootstrap, textAlign: "center" }]}>
              {selectedImage?.uri ? t("common.label-edit") : t("common.label-add")}
            </Text>
          </TouchableOpacity>
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
    width: 80,
    height: 80,
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
});

export default EditProfile;
