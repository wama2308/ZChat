import { ImagePickerButton } from "@components/ui/ImagePickerButton";
import ModalBottom from "@components/ui/ModalBottom";
import { type AppTheme, SPACES } from "@config/themes/themes";
import { type FormValuesAddContact } from "@hooks/contacts/useAddContacts";
import { type FormValuesEditProfile } from "@hooks/settings/useProfile";
import { type AssetImageCrop } from "@interfaces/config";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { HelperText, Text, TextInput, useTheme } from "react-native-paper";

interface Props {
  control: Control<FormValuesEditProfile, any, FormValuesEditProfile>;
  modalShow: boolean;
  selectedImage: AssetImageCrop | null;
  handleModalShow: (value: boolean) => void;
  handleSelectedImage: (value: AssetImageCrop | null) => void;
  hasChanges?: boolean;
  loading?: boolean;
  errors?: FieldErrors<FormValuesEditProfile> | FieldErrors<FormValuesAddContact>;
}

const EditProfile = ({
  control,
  modalShow,
  selectedImage,
  handleModalShow,
  handleSelectedImage,
  hasChanges,
  loading = false,
  errors,
}: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const TITLE_MODAL_BOTTOM = hasChanges
    ? t("profile.label-edit-profile-picture")
    : t("profile.label-add-profile-picture");

  return (
    <>
      <View style={styles.content}>
        <TouchableOpacity style={{ gap: SPACES.g1 }}>
          <Image
            source={
              selectedImage?.uri ? { uri: selectedImage.uri } : require("../../assets/images/user-select.jpg")
            }
            style={styles.image}
          />
          <TouchableOpacity onPress={() => handleModalShow(true)} disabled={loading}>
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
              <>
                <TextInput
                  autoCapitalize="sentences"
                  label={t("form.label-name")}
                  value={value}
                  onChangeText={onChange}
                  style={{ backgroundColor: "transparent" }}
                  disabled={loading}
                  error={!!errors?.name?.message}
                />
                {!!errors?.name?.message && (
                  <HelperText type="error" visible={!!errors?.name?.message}>
                    {errors?.name?.message}
                  </HelperText>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="lastname"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  autoCapitalize="sentences"
                  label={t("form.label-lastname")}
                  value={value}
                  onChangeText={onChange}
                  style={{ backgroundColor: "transparent" }}
                  disabled={loading}
                  error={!!errors?.lastname?.message}
                />
                {!!errors?.lastname?.message && (
                  <HelperText type="error" visible={!!errors?.lastname?.message}>
                    {errors?.lastname?.message}
                  </HelperText>
                )}
              </>
            )}
          />
        </View>
      </View>
      <ModalBottom visible={modalShow} onDismiss={() => handleModalShow(false)}>
        <ImagePickerButton
          titleId={TITLE_MODAL_BOTTOM}
          onImageSelected={handleSelectedImage}
          callBack={() => handleModalShow(false)}
        />
      </ModalBottom>
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
