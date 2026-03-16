import React, { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/Auth/Auth.module.scss';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.auth__form}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="email"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="current-password"
        required
      />
      <Button type="submit" variant="primary" size="medium">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
