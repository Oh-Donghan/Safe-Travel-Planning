import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Label,
  Title,
  Wrapper,
  Error,
  Switcher,
} from '../components/styles/auth-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import SocialButton from '../components/SocialButton';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { id, value },
    } = e;
    if (id === 'name') {
      setName(value);
    } else if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || name === '' || email === '' || password === '') return;
    try {
      setIsLoading(true);

      const creadentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(creadentials.user, {
        displayName: name,
      });
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/email-already-in-use') {
          setError('That email already exists.');
        } else {
          setError(e.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join Annyeong</Title>
      <Form onSubmit={onSubmit}>
        <Label htmlFor='name'>Name</Label>
        <Input
          onChange={onChange}
          id='name'
          value={name}
          type='text'
          placeholder='Please enter your username.'
          required
        />
        <Label htmlFor='name'>Email</Label>
        <Input
          onChange={onChange}
          id='email'
          value={email}
          type='email'
          placeholder='Please enter your Email.'
          required
        />
        <Label htmlFor='name'>Password</Label>
        <Input
          onChange={onChange}
          id='password'
          value={password}
          type='password'
          placeholder='Please enter your Password.'
          required
        />
        <Input
          type='submit'
          value={isLoading ? 'Loading...' : 'Create Account'}
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? &nbsp;&nbsp;{' '}
        <Link to='/login'>Log in &rarr;</Link>
      </Switcher>
      <SocialButton />
    </Wrapper>
  );
}
