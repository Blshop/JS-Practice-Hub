import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authStore } from 'store/AuthStore';
import { createLoginSchema } from '../../schemas/loginSchema';
import type { LoginFormData } from '../../schemas/loginSchema';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/Auth/Auth.module.scss';

const LoginForm: React.FC = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = createLoginSchema({
    emailInvalid: t('auth.validation.emailInvalid'),
    passwordMin: t('auth.validation.passwordMin'),
    passwordUppercase: t('auth.validation.passwordUppercase'),
    passwordDigit: t('auth.validation.passwordDigit'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await authStore.login(data.email, data.password);
    if (success) navigate('/');
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
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
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" variant="primary" size="medium" loading={authStore.isLoading}>
        {t('auth.login')}
      </Button>
    </form>
  );
});

export default LoginForm;
