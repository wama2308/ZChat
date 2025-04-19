import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormValues {
  name: string;
  lastname: string;
}

const useProfile = () => {
  const { t } = useTranslation();

  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = useCallback((value: boolean) => {
    setEdit(value);
  }, []);

  const {
    handleSubmit: handleSubmitForm,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm<FormValues>({
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

  return { edit, control, errors, isSubmitting, isValid, handleEdit, handleSubmitForm };
};

export default useProfile;
