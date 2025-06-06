import { MutationKey } from "@constants/queriesAndMutations";
import { createContact } from "@database/actions/contacts";
import { exists, unlink } from "@dr.pogodin/react-native-fs";
import { type AssetImageCrop } from "@interfaces/config";
import { EContactStatus, type IItemContact } from "@interfaces/contacts";
import { useMutation } from "@tanstack/react-query";
import { moveImageContact } from "@utils/imageRFNS";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormValuesAddContact {
  name: string;
  lastname: string;
  image?: string;
  phone: string;
}

const useAddContacts = () => {
  const { t } = useTranslation();

  const [selectedImage, setSelectedImage] = useState<AssetImageCrop | null>(null);
  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = useCallback((value: boolean) => {
    setModalShow(value);
  }, []);

  const handleSelectedImage = useCallback((value: AssetImageCrop | null) => {
    setValue("image", value?.uri);
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
      name: "",
      lastname: "",
      image: "",
      phone: "",
    },
    resolver: (values) => {
      const errors: Record<string, any> = {};

      if (!values.name) {
        errors.name = { type: "required", message: t("rules-validation-edit-profile-name") };
      }
      if (!values.lastname) {
        errors.lastname = {
          type: "required",
          message: t("rules-validation-edit-profile-name"),
        };
      }

      return { values, errors };
    },
  });

  const hasChanges = isDirty && Object.keys(dirtyFields).some((field) => field);

  const resetForm = () => {
    reset(); // ← resetea RHF
    setSelectedImage(null); // ← resetea tu estado local
  };

  const { mutateAsync: saveContact } = useMutation({
    mutationKey: [MutationKey.contacts.create],
    mutationFn: async (data: IItemContact) => {
      return await createContact(data);
    },

    onError: async (error: unknown, variables: IItemContact) => {
      console.error("Error guardando el contacto ", error);
      if (variables.image && (await exists(variables.image))) {
        try {
          await unlink(variables.image);
        } catch (unlinkErr) {
          console.error("No se pudo eliminar la imagen:", unlinkErr);
        }
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
      firstName: formData.name,
      lastName: formData.lastname,
      phoneNumbers: [{ label: "mobile", number: formData.phone }],
      image: imagePath ?? "",
      email: [],
      status: EContactStatus.OFFLINE,
      zchat: true,
      addFavorite: false,
      synchronized: false,
    };

    await saveContact(payload);
  });

  return {
    control,
    errors,
    isSubmitting,
    isValid,
    selectedImage,
    modalShow,
    hasChanges,
    handleModalShow,
    handleSubmitForm,
    handleSelectedImage,
    resetForm,
    handleSaveContact,
  };
};

export default useAddContacts;
