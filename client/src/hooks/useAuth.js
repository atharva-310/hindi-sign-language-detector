import { useEffect, useState } from 'react';
export default function useAuth() {
  const [isLoggedIn, setLogin] = useState(false);
  const [userInfo, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const addUser = async () => {
    fetch('/protected/user-info', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.data.user) {
          setUser(data.data.user);
          setLogin(true);
        }
      });
  };

  const signIn = async credentials => {
    const data = {
      email: credentials.email,
      password: credentials.password,
    };
    return fetch('/auth/sign-in', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          setToken(data.token);
          setLogin(true);
          return true;
        } else {
          return false;
        }
      });
  };
  const signUp = async data => {
    console.log(data);
    fetch('/auth/create-user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.ok === 'success') {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const logout = () => {
    setLogin(false);
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      addUser();
    }
  }, [token]);
  return [isLoggedIn, userInfo, signIn, signUp, logout];
}
