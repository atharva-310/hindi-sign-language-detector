import { useState } from 'react';

export default function useFormAuth() {
  const [formSignIN, setFromSignIn] = useState({
    email: '',
    password: '',
  });
  const [formSignUP, setFormSignUp] = useState({
    email: '',
    password: '',
    first: '',
    last: '',
  });
  const [formError, setFormError] = useState({
    isInvalid: false,
    message: '',
  });
  const [signUPAction, setSignUpAction] = useState(false);
  const handleChangeSignIn = e => {
    e.preventDefault();
    setFormError({
      isInvalid: false,
      message: '',
    });

    setFromSignIn(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleChangeSignUp = e => {
    e.preventDefault();

    setFormSignUp(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return [
    formSignIN,
    setFromSignIn,
    formSignUP,
    setFormSignUp,
    formError,
    setFormError,
    signUPAction,
    setSignUpAction,
    handleChangeSignIn,
    handleChangeSignUp,
  ];
}
