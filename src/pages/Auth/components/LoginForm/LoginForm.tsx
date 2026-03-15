import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { authStore } from 'store/AuthStore';
import { loginSchema } from '../../schemas/loginSchema';
import type { LoginFormData } from '../../schemas/loginSchema';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import styles from 'pages/Auth/Auth.module.scss';

const LoginForm: React.FC = observer(() => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await authStore.login(data.email, data.password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
      {authStore.error && (
        <Text error className={styles.auth__error}>
          {authStore.error}
        </Text>
      )}
      <Input
        type="email"
        placeholder="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" variant="primary" size="medium" loading={authStore.isLoading}>
        Login
      </Button>
    </form>
  );
});

export default LoginForm;
