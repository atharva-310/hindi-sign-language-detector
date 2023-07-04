import { useContext } from 'react';
import { SetUserInfoContext, UserInfoContext } from '../Context/userContext';

/**
 * UserUser -> Logged in user Information
 * @returns  {
 *    isLoggedIn : Boolean,
 *    user: Object,
 *    token: String,
 * }
 */

export function useUser() {
  return useContext(UserInfoContext);
}

/**
 * useSetUser -> Return function to set the userInfo object
 */
export function useSetUser() {
  return useContext(SetUserInfoContext);
}
