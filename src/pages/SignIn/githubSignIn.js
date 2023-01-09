import { auth, provider } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';
import { signInWithGitHub } from '../../services/authGithub';
import { useState } from 'react';
import styled from 'styled-components';
import { signInWithPopup } from 'firebase/auth';
import { IoLogoGithub } from 'react-icons/io';
import Button from '../../components/Form/Button';

export default function SignWithGithub() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  async function signInWithGitHubPopup(e) {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
        const token = res.user.accessToken;
        const email = res.user.email;
        const password = res.user.uid;
        const userData = signInWithGitHub(email, password, token)
          .then((res) => {
            console.log(res);
            setUserData(res);
            navigate('/dashboard');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }

  return (
    <Button
      onClick={(e) => {
        signInWithGitHubPopup(e);
      }}
      fullWidth
      color="primary"
    >
      <IoLogoGithub size={'23px'} /> Entrar com GitHub
    </Button>
  );
}
