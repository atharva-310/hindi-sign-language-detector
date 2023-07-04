import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import useFormAuth from '../../../hooks/useFormData';
export const SignUpFrom = ({ signupData, handleChangeSignUp }) => {
  return (
    <>
      <FormControl>
        <FormLabel> First Name </FormLabel>
        <Input
          name="first"
          type="text"
          mb="10px"
          value={signupData.first}
          onChange={handleChangeSignUp}
        />
      </FormControl>
      <FormControl>
        <FormLabel> Last Name </FormLabel>
        <Input
          name="last"
          type="text"
          mb="10px"
          value={signupData.last}
          onChange={handleChangeSignUp}
        />
      </FormControl>
      <FormControl>
        <FormLabel> Email </FormLabel>
        <Input
          name="email"
          type="email"
          mb="10px"
          value={signupData.email}
          onChange={handleChangeSignUp}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          autoComplete="new-password"
          name="password"
          type="password"
          value={signupData.password}
          onChange={handleChangeSignUp}
        />
      </FormControl>
    </>
  );
};
