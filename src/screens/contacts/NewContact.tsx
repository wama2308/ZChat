import HeaderAddContact from "@components/contacts/HeaderAddContact";
import PhonesEmailsFromAgenda from "@components/contacts/PhonesEmailsFromAgenda";
import EditProfile from "@components/settings/EditProfile";
import { SPACES, type AppTheme } from "@config/themes/themes";
import useAddContacts from "@hooks/contacts/useAddContacts";
import { type FormValuesEditProfile } from "@hooks/settings/useProfile";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import Icon from "@react-native-vector-icons/ionicons";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { memo } from "react";
import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { HelperText, TextInput, useTheme } from "react-native-paper";

const NewContact = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const route = useRoute<RouteProp<RootStackParamListContacts>>();
  const { contact, fromAgenda } = route.params || {};

  const {
    control,
    modalShow,
    selectedImage,
    hasChanges,
    LOADING,
    errors,
    handleModalShow,
    handleSelectedImage,
    resetForm,
    handleSaveContact,
  } = useAddContacts({ data: contact, fromAgenda: fromAgenda || false });

  return (
    <>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <HeaderAddContact
          title={contact && !fromAgenda ? t("contacts.edit") : t("contacts.new")}
          hasChanges={hasChanges}
          reset={resetForm}
          action={handleSaveContact}
          loading={LOADING}
        />
        <View style={styles.contentContainer}>
          <EditProfile
            control={control as unknown as Control<FormValuesEditProfile>}
            modalShow={modalShow}
            selectedImage={selectedImage}
            handleModalShow={handleModalShow}
            handleSelectedImage={handleSelectedImage}
            hasChanges={hasChanges}
            errors={errors}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  label={t("form.label-number-zchat")}
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  keyboardType="numeric"
                  maxLength={10}
                  style={styles.input}
                  error={!!errors?.phone?.message}
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
                {!!errors.phone?.message && (
                  <HelperText type="error" visible={!!errors.phone?.message}>
                    {errors.phone?.message}
                  </HelperText>
                )}
              </>
            )}
          />
          {fromAgenda && (
            <PhonesEmailsFromAgenda
              phoneNumbers={contact?.phoneNumbers ?? []}
              emails={contact?.email ?? []}
            />
          )}
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    margin: SPACES.m2,
    paddingBottom: 60,
  },
  input: {
    height: 60,
    width: "100%",
    marginTop: SPACES.m3,
  },
});

export default memo(NewContact);
