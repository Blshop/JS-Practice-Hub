import React, { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/Auth/Auth.module.scss';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register', { username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.auth__form}>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        autoComplete="username"
        required
      />
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
        autoComplete="new-password"
        required
      />
      <Button type="submit" variant="primary" size="medium">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
