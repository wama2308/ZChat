import AddDeleteNumber, { type AddDeleteNumberRef } from "@components/contacts/AddDeleteNumber";
import HeaderAddContact from "@components/contacts/HeaderAddContact";
import EditProfile from "@components/settings/EditProfile";
import { SPACES } from "@config/themes/themes";
import useAddContacts from "@hooks/contacts/useAddContacts";
import { type FormValuesEditProfile } from "@hooks/settings/useProfile";
import { useRef } from "react";
import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

const NewContact = () => {
  const { t } = useTranslation();

  const { control, modalShow, selectedImage, hasChanges, handleModalShow, handleSelectedImage, resetForm } =
    useAddContacts();
  // console.log("control ", control._formValues);
  const addDeleteNumberRef = useRef<AddDeleteNumberRef>(null);

  const handleDismiss = () => {
    addDeleteNumberRef.current?.closeActive();
    //Keyboard.dismiss();
  };

  return (
    <>
      <HeaderAddContact title={t("contacts.new")} hasChanges={hasChanges} reset={resetForm} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          onTouchEnd={handleDismiss}
        >
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
            name="phones"
            render={({ field: { value, onChange } }) => (
              <AddDeleteNumber
                ref={addDeleteNumberRef as React.RefObject<AddDeleteNumberRef>}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    margin: SPACES.m2,
    gap: SPACES.g3,
    paddingBottom: 60,
  },
});

export default NewContact;
