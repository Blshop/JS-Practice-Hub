import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authStore } from 'store/AuthStore';
import { createRegisterSchema } from '../../schemas/registerSchema';
import type { RegisterFormData } from '../../schemas/registerSchema';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/Auth/Auth.module.scss';

const RegisterForm: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = createRegisterSchema({
    usernameRequired: t('auth.validation.usernameRequired'),
    emailInvalid: t('auth.validation.emailInvalid'),
    passwordMin: t('auth.validation.passwordMin'),
    passwordUppercase: t('auth.validation.passwordUppercase'),
    passwordDigit: t('auth.validation.passwordDigit'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const success = await authStore.register(data.username, data.email, data.password);
    if (success) navigate('/');
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
      <Input
        placeholder={t('auth.usernamePlaceholder')}
        autoComplete="username"
        error={errors.username?.message}
        {...register('username')}
      />
      <Input
        type="email"
        placeholder={t('auth.emailPlaceholder')}
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        type="password"
        placeholder={t('auth.passwordPlaceholder')}
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" variant="primary" size="medium" loading={authStore.isLoading}>
        {t('auth.register')}
      </Button>
    </form>
  );
});

export default RegisterForm;
