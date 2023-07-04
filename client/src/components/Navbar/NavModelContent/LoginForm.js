import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export const LoginForm = ({ loginData, handleChangeLogin }) => {
  return (
    <>
      <FormControl isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          name="email"
          type="email"
          mb="10px"
          value={loginData.email}
          onChange={handleChangeLogin}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChangeLogin}
        />
      </FormControl>
    </>
  );
};
