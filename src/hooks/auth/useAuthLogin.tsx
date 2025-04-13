import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormValues {
  userNameNumberZChat: string;
  password: string;
}

const useAuthLogin = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const {
    handleSubmit: handleSubmitForm,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      userNameNumberZChat: '',
      password: '',
    },
    resolver: (values) => {
      const errors: Record<string, any> = {};

      if (!values.userNameNumberZChat) {
        errors.userNameNumberZChat = {
          type: 'required',
          message: t('validation.rules-validation-username-numberzchat'),
        };
      }
      if (!values.password) {
        errors.password = { type: 'required', message: t('validation.rules-validation-password') };
      }
      if (values.password && values.password.length < 6) {
        errors.password = {
          type: 'required',
          message: t('validation.rules-validation-password-lenght'),
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
    handleShowPassword,
    handleSubmit,
  };
};

export default useAuthLogin;
