import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/loginSchema';
import type { LoginFormData } from '../../schemas/loginSchema';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/Auth/Auth.module.scss';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
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
      <Button type="submit" variant="primary" size="medium" disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
