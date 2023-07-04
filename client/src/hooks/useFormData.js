import { useState } from 'react';
/**
 * userFormData (Custom Hook)
 * Will provide state and set form data function (controlled input).
 */

export default function useFormData() {
  /**
   *  * Login Form *
   *  State -> LoginData
   *  State Setter -> setLoginData
   *  Event Handler -> handleLoginChange
   *
   */

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChangeLogin = e => {
    e.preventDefault();

    setLoginData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  /**
   *  * Sign Up Form *
   *  State -> signupData
   *  State Setter -> setSignupData
   *  Event Handler -> handleLoginChange
   *
   */

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    first: '',
    last: '',
  });

  const handleChangeSignUp = e => {
    e.preventDefault();

    setSignupData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return {
    loginData,
    setLoginData,
    handleChangeLogin,

    signupData,
    setSignupData,
    handleChangeSignUp,
  };
}
