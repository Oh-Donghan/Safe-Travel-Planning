import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from '../../firebase';

const Button = styled.span`
  display: flex;
  flex-direction: row-reverse;
  width:80%;
  margin-top: 50px;
  padding: 10px 20px;
  border: 0;
  border-radius: 40px;
  background-color: #333D79;
  outline: 2px solid #FAEBEF;
  color:#dda94b;
  font-weight: 500;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export default function SocialButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <Button onClick={onClick}>
      <img className='h-6' src='/google-logo.svg' />
      Continue with
    </Button>
  )
}
