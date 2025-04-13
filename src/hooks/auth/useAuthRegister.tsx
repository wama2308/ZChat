import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const useAuthRegister = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const {
    handleSubmit: handleSubmitForm,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: (values) => {
      const errors: Record<string, any> = {};

      if (!values.username) {
        errors.username = { type: 'required', message: t('rules-validation-username') };
      }
      if (!values.password) {
        errors.password = { type: 'required', message: t('rules-validation-password') };
      }
      if (values.password && values.password.length < 6) {
        errors.password = { type: 'required', message: t('rules-validation-password-lenght') };
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = {
          type: 'required',
          message: t('rules-validation-confirm-password'),
        };
      }
      console.log(values);
      if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = {
          type: 'required',
          message: t('rules-validation-password-confirm-password-do-not-match'),
        };
      }

      return { values, errors };
    },
  });

  const handleSubmit = handleSubmitForm(async (formData) => {
    console.log('Form data ', formData);

    // Do login
  });
  return {
    errors,
    isSubmitting,
    isValid,
    control,
    showPassword,
    showConfirmPassword,
    handleShowPassword,
    handleShowConfirmPassword,
    handleSubmit,
  };
};

export default useAuthRegister;
