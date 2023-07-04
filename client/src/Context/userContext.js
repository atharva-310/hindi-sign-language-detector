import { createContext, useState } from 'react';
export const UserInfoContext = createContext(null);
export const SetUserInfoContext = createContext(null);

const initialState = {
  isLoggedIn: false,
  user: null,
  token: '',
};

/**
 *
 * UserProvider
 *  Wrap children with 2 provider
 *  UserInfoContext -> store the userInfo object
 *  SetUserInfoContext -> function to set and reset userInfo
 */

export function UserProvider({ children }) {
  // Both the function will be aviable to all the components
  const [userInfo, setUserInfo] = useState(initialState);

  return (
    <UserInfoContext.Provider value={userInfo}>
      <SetUserInfoContext.Provider value={setUserInfo}>
        {children}
      </SetUserInfoContext.Provider>
    </UserInfoContext.Provider>
  );
}
