import { urlencodeBody } from '../utils';
import { useSetUser } from './userHooks';
/**
 * UseAuth (custom hook)
 * Return function which will make api calls for authentication
 * Error thrown by this functions will be caught by the Action function which call them
 *
 * @returns {login, singup, logout}
 *
 */

export default function useAuth() {
  const setUser = useSetUser();

  const login = async loginData => {
    const body = {
      email: loginData.email,
      password: loginData.password,
    };
    const encodedBody = urlencodeBody(body);

    const response = await fetch('/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodedBody,
    });
    const data = await response.json();
    if(data?.status === "success" ) {
      return data.payload
    }
    else if (data?.status === "error" ) {
      throw Error(data.message);

    } 
  };

  const signUp = async signupData => {
    const body = {
      email: signupData.email,
      password: signupData.password,
      name: {
        first: signupData.first,
        last: signupData.last,
      },
    };

    const encodedBody = urlencodeBody(body);
    const response = await fetch('/auth/create-user', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (data.status === "success") {
      return data.payload;
    } else {
      throw Error(data.message);
    }
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      user: null,
      token: null,
    });
    window.localStorage.removeItem('userInfo');
  };

  return { login, signUp, logout };
}
