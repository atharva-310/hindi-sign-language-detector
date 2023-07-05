import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';

import { toastOption } from '../../../utils';

import { useSetUser } from '../../../hooks/userHooks';
import { LoginForm } from './LoginForm';
import { SignUpFrom } from './SignUpFrom';
import useAuth from '../../../hooks/useAuth';

import useFormData from '../../../hooks/useFormData';
import useSpeech from '../../../hooks/useSpeech';
export const AuthModal = ({
  initialRef,
  finalRef,
  isOpen,
  onClose,
  onOpen,
  props,
}) => {
  const {
    loginData,
    setLoginData,
    handleChangeLogin,

    signupData,
    setSignupData,
    handleChangeSignUp,
  } = useFormData();

  const [isLoginForm, setLoginForm] = useState(true);
  const toast = useToast();
  const setUser = useSetUser();
  const { login, signUp } = useAuth();

  async function loginAction() {
    try {
      const response = await login(loginData);
      const data = {
        isLoggedIn: true,
        user: response.user,
        token: response.token,
      };
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      onClose();
      toast({
        ...toastOption,
        title: 'Logged In',
        description: 'You have successfully logged in.',
      });
      setLoginData({
        email: '',
        password: '',
      });
    } catch (err) {
      toast({
        ...toastOption,
        title: 'Failed to Login',
        description: err.message,
        status: 'error',
      });
      setLoginData({
        email: '',
        password: '',
      });
    }
  }

  async function signupAction() {
    try {
      await signUp(signupData);

      toast({
        ...toastOption,
        title: 'Account created successfully',
        description: 'Login with your new account',
      });
      setLoginData({
        email: signupData.email,
        password: '',
      });
      setSignupData({
        email: '',
        password: '',
        first: '',
        last: '',
      });
      setLoginForm(true);
    } catch (err) {
      toast({
        ...toastOption,
        title: 'Failed to Create Account',
        description: err.message ? err.message : 'Check all the input field',
        status: 'error',
      });
      setSignupData({
        email: '',
        password: '',
        first: '',
        last: '',
      });
    }
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isLoginForm ? 'Login' : 'Sign Up'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {isLoginForm ? (
            <LoginForm
              loginData={loginData}
              handleChangeLogin={handleChangeLogin}
            />
          ) : (
            <SignUpFrom
              signupData={signupData}
              handleChangeSignUp={handleChangeSignUp}
            />
          )}
        </ModalBody>

        <ModalFooter>
          {isLoginForm ? (
            <>
              <Button colorScheme="blue" mr={3} onClick={loginAction}>
                Login
              </Button>
              <Button
                onClick={() => {
                  setLoginForm(prev => !prev);
                }}
              >
                Sign Up Page
              </Button>
            </>
          ) : (
            <>
              <Button colorScheme="blue" mr={3} onClick={signupAction}>
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  setLoginForm(prev => !prev);
                }}
              >
                Login Page
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
