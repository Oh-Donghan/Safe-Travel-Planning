import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import SocialButton from '../components/SocialButton';
import { Form, Input, Label, Switcher, Title, Wrapper, Error } from '../components/styles/auth-components';


export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || email === '' || password === '') return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Wrapper>
      <Title>Log into SNS</Title>
      <Form onSubmit={onSubmit}>
        <Label htmlFor='email'>Email</Label>
        <Input className=' dark:bg-my-bg bg-my-text dark:text-my-text text-my-bg'
          id='email'
          onChange={onChange}
          name='email'
          value={email}
          placeholder='Please enter your Email.'
          type='email'
          required
        />
        <Label htmlFor='password'>Password</Label>
        <Input className=' dark:bg-my-bg bg-my-text dark:text-my-text text-my-bg'
          id='password'
          onChange={onChange}
          name='password'
          value={password}
          placeholder='Please enter your Password.'
          type='password'
          required
        />
        <Input type='submit' value={isLoading ? 'Loading...' : 'Log in'} className=' outline-normal dark:outline-dark' />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account? &nbsp;&nbsp;
        <Link to='/create-account'>Create one &rarr;</Link>
      </Switcher>
      <SocialButton />
    </Wrapper>
  )
}
