import { type AssetImageCrop } from "@interfaces/config";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormValuesEditProfile {
  name: string;
  lastname: string;
  image?: string;
}

const useProfile = () => {
  const { t } = useTranslation();

  const [selectedImage, setSelectedImage] = useState<AssetImageCrop | null>(null);
  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = useCallback((value: boolean) => {
    setModalShow(value);
  }, []);

  const handleSelectedImage = useCallback((value: AssetImageCrop | null) => {
    setSelectedImage(value);
  }, []);

  const {
    handleSubmit: handleSubmitForm,
    formState: { errors, isSubmitting, isValid, isDirty, dirtyFields },
    reset,
    control,
  } = useForm<FormValuesEditProfile>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      lastname: "",
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

      return { values, errors };
    },
  });

  const hasChanges = isDirty && Object.keys(dirtyFields).some((field) => field);

  const resetForm = () => {
    reset(); // ← resetea RHF
    setSelectedImage(null); // ← resetea tu estado local
  };

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
  };
};

export default useProfile;
