import HeaderAddContact from "@components/contacts/HeaderAddContact";
import EditProfile from "@components/settings/EditProfile";
import { SPACES, type AppTheme } from "@config/themes/themes";
import useAddContacts from "@hooks/contacts/useAddContacts";
import { type FormValuesEditProfile } from "@hooks/settings/useProfile";
import Icon from "@react-native-vector-icons/ionicons";
import { memo } from "react";
import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

const NewContact = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  const {
    control,
    modalShow,
    selectedImage,
    hasChanges,
    handleModalShow,
    handleSelectedImage,
    resetForm,
    handleSaveContact,
  } = useAddContacts();

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <HeaderAddContact
        title={t("contacts.new")}
        hasChanges={hasChanges}
        reset={resetForm}
        action={handleSaveContact}
      />
      <View style={styles.contentContainer}>
        <EditProfile
          control={control as unknown as Control<FormValuesEditProfile>}
          modalShow={modalShow}
          selectedImage={selectedImage}
          handleModalShow={handleModalShow}
          handleSelectedImage={handleSelectedImage}
          hasChanges={hasChanges}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <TextInput
              label={t("common.label-number")}
              value={value}
              onChangeText={(text) => onChange(text)}
              keyboardType="numeric"
              maxLength={10}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={() => (
                    <Icon
                      name={"close-outline"}
                      size={20}
                      color="#000000"
                      style={{ backgroundColor: colors.outline, borderRadius: 30 }}
                    />
                  )}
                  onPress={() => onChange("")}
                  style={value ? { opacity: 1 } : { opacity: 0 }}
                />
              }
            />
          )}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    margin: SPACES.m2,
    gap: SPACES.g3,
    paddingBottom: 60,
  },
  input: {
    height: 60,
    width: "100%",
  },
});

export default memo(NewContact);
