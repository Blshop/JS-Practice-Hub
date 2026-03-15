import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { authStore } from 'store/AuthStore';
import { registerSchema } from '../../schemas/registerSchema';
import type { RegisterFormData } from '../../schemas/registerSchema';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import styles from 'pages/Auth/Auth.module.scss';

const RegisterForm: React.FC = observer(() => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const success = await authStore.register(data.username, data.email, data.password);
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
        placeholder="Username"
        autoComplete="username"
        error={errors.username?.message}
        {...register('username')}
      />
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
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" variant="primary" size="medium" loading={authStore.isLoading}>
        Register
      </Button>
    </form>
  );
});

export default RegisterForm;
