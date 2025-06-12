import { MutationKey } from "@constants/queriesAndMutations";
import { createContact, updateContact } from "@database/actions/contacts";
import { type AssetImageCrop } from "@interfaces/config";
import { EContactStatus, type IItemContact } from "@interfaces/contacts";
import { type RawWithDetails } from "@interfaces/generic";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { deleteImageIfExists, getImageUri, moveImageContact } from "@utils/imageRFNS";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

interface Props {
  data?: IItemContact;
}

export interface FormValuesAddContact {
  id: string;
  name: string;
  lastname: string;
  image?: string;
  phone: string;
}

const useAddContacts = ({ data }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();
  const PHONE_ID = data?.phoneNumbers?.[0]?.id ?? "";

  const [selectedImage, setSelectedImage] = useState<AssetImageCrop | null>(
    data?.image ? { uri: getImageUri(data.image) } : null
  );
  const [modalShow, setModalShow] = useState<boolean>(false);

  const handleModalShow = useCallback((value: boolean) => {
    setModalShow(value);
  }, []);

  const handleSelectedImage = useCallback((value: AssetImageCrop | null) => {
    setValue("image", value?.uri, { shouldDirty: true });
    setSelectedImage(value);
  }, []);

  const {
    handleSubmit: handleSubmitForm,
    formState: { errors, isSubmitting, isValid, isDirty, dirtyFields },
    reset,
    setValue,
    control,
  } = useForm<FormValuesAddContact>({
    mode: "onBlur",
    defaultValues: {
      id: data?.id ?? "",
      name: data?.firstName ?? "",
      lastname: data?.lastName ?? "",
      image: data?.image ?? "",
      phone: data?.phoneNumbers?.[0]?.number ?? "",
    },
    resolver: (values) => {
      const errors: Record<string, any> = {};

      if (!values.name) {
        errors.name = { type: "required", message: t("validation.rules-validation-edit-profile-name") };
      }
      if (!values.lastname) {
        errors.lastname = {
          type: "required",
          message: t("validation.rules-validation-edit-profile-lastname"),
        };
      }
      if (!values.phone) {
        errors.phone = { type: "required", message: t("validation.rules-validation-number-zchat-required") };
      }

      return { values, errors };
    },
  });

  const hasChanges = isDirty && Object.keys(dirtyFields).some((field) => field);

  const resetForm = () => {
    reset(); // ← resetea RHF
    if (!data) {
      setSelectedImage(null); // ← resetea tu estado local
    }
  };

  const { mutateAsync: saveContact, isPending: isLoadingAddContact } = useMutation({
    mutationKey: [MutationKey.contacts.create],
    mutationFn: async (data: IItemContact) => {
      return await createContact(data);
    },
    onSuccess(response: RawWithDetails<IItemContact>) {
      console.info("response ", response);
      Toast.show({
        type: "success",
        text1: t("contacts.save-successfully"),
      });
      resetForm();
      navigation.goBack();
    },
    onError: async (error: unknown, variables: IItemContact) => {
      console.error("Error guardando el contacto ", error);
      Toast.show({
        type: "error",
        text1: t("contacts.save-error"),
      });
      if (variables.image) {
        await deleteImageIfExists(variables.image);
      }
    },
  });

  const { mutateAsync: editContact, isPending: isLoadingEditContact } = useMutation({
    mutationKey: [MutationKey.contacts.create],
    mutationFn: async (data: IItemContact) => {
      return await updateContact(data);
    },
    async onSuccess(response: RawWithDetails<IItemContact>) {
      console.info("response del edit ", response);
      if (data?.image) {
        await deleteImageIfExists(data.image);
      }
      Toast.show({
        type: "success",
        text1: t("contacts.edit-successfully"),
      });
      resetForm();
      navigation.goBack();
    },
    onError: async (error: unknown, variables: IItemContact) => {
      console.error("Error editando el contacto ", error);
      Toast.show({
        type: "error",
        text1: t("contacts.edit-error"),
      });
      if (variables.image) {
        await deleteImageIfExists(variables.image);
      }
    },
  });

  const handleSaveContact = handleSubmitForm(async (formData) => {
    let imagePath = "";

    if (formData.image) {
      const movedImagePath = await moveImageContact(formData.image, "contacts");
      if (!movedImagePath) {
        return; // corta la ejecución si falla el movimiento
      }
      imagePath = movedImagePath;
    }

    const payload: IItemContact = {
      id: formData.id,
      firstName: formData.name,
      lastName: formData.lastname,
      phoneNumbers: [{ id: PHONE_ID, label: "mobile", number: formData.phone }],
      image: imagePath ?? "",
      email: [],
      status: EContactStatus.OFFLINE,
      zchat: true,
      addFavorite: false,
      synchronized: false,
    };
    if (data) {
      await editContact(payload);
    } else {
      await saveContact(payload);
    }
  });

  const LOADING = useMemo(() => {
    return isLoadingAddContact || isLoadingEditContact;
  }, [isLoadingAddContact, isLoadingEditContact]);

  return {
    control,
    errors,
    isSubmitting,
    isValid,
    selectedImage,
    modalShow,
    hasChanges,
    LOADING,
    handleModalShow,
    handleSubmitForm,
    handleSelectedImage,
    resetForm,
    handleSaveContact,
  };
};

export default useAddContacts;
