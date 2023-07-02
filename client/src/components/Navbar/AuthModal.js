import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  Image,
  HStack,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import profile from '../../assets/profile.png';

import useFormAuth from '../../hooks/useFormAuth';

export default function AuthModal({
  initialRef,
  finalRef,
  isOpen,
  onClose,
  onOpen,
  ...props
}) {
  const [
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
  ] = useFormAuth();
  return (
    <>
      {props.isLoggedIn ? (
        <>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> Account Details </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <HStack>
                  <Image
                    width="20%"
                    objectFit="cover"
                    borderRadius="50%"
                    onClick={onOpen}
                    src={profile}
                    alt="Dan Abramov"
                  />
                  <Box minH="100px" p="10px" width="80%">
                    <Text as="b" fontSize="30px" display="block">
                      {props.auth.user
                        ? props.auth.user.name.first +
                          ' ' +
                          props.auth.user.name.last
                        : 'mrX'}
                    </Text>
                    <Text as="i" size="md">
                      {props.auth.user
                        ? props.auth.user.email
                        : 'mrX@gamil.com'}
                    </Text>
                  </Box>
                </HStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => {
                    props.auth.logout();
                    onClose();
                  }}
                  colorScheme="red"
                  mr={3}
                >
                  Logout
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{signUPAction ? 'Sign Up' : 'Login'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {signUPAction ? (
                <>
                  <FormLabel> First Name </FormLabel>
                  <Input
                    name="first"
                    type="text"
                    mb="10px"
                    value={formSignUP.first}
                    onChange={handleChangeSignUp}
                  />
                  <FormControl />
                  <FormLabel> Last Name </FormLabel>
                  <Input
                    name="last"
                    type="text"
                    mb="10px"
                    value={formSignUP.last}
                    onChange={handleChangeSignUp}
                  />
                  <FormLabel> Email </FormLabel>
                  <Input
                    name="email"
                    type="email"
                    mb="10px"
                    value={formSignUP.email}
                    onChange={handleChangeSignUp}
                  />
                  <FormLabel>Password</FormLabel>
                  <Input
                    autoComplete="new-password"
                    name="password"
                    type="password"
                    value={formSignUP.password}
                    onChange={handleChangeSignUp}
                  />
                </>
              ) : (
                <>
                  <FormControl isRequired isInvalid={formError.isInvalid}>
                    <FormLabel> Email </FormLabel>
                    <Input
                      name="email"
                      type="email"
                      mb="10px"
                      value={formSignIN.email}
                      onChange={handleChangeSignIn}
                    />
                  </FormControl>
                  <FormControl isRequired isInvalid={formError.isInvalid}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      value={formSignIN.password}
                      onChange={handleChangeSignIn}
                    />
                    <FormErrorMessage>{formError.message}</FormErrorMessage>
                  </FormControl>
                </>
              )}
            </ModalBody>

            <ModalFooter>
              {signUPAction ? (
                <>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={async () => {
                      props.auth.signUp({
                        email: formSignUP.email,
                        password: formSignUP.password,
                        name: {
                          first: formSignUP.first,
                          last: formSignUP.last,
                        },
                      });
                      onClose();
                      setFormSignUp({
                        email: '',
                        password: '',
                        first: '',
                        last: '',
                      });
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => {
                      setSignUpAction(prev => !prev);
                    }}
                  >
                    Login Page
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={async () => {
                      props.auth
                        .signIn({
                          email: formSignIN.email,
                          password: formSignIN.password,
                        })
                        .then(flag => {
                          if (flag) {
                            onClose();
                          } else {
                            setFormError({
                              isInvalid: true,
                              message: 'Invalid user Credentials',
                            });
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          setFormError({
                            isInvalid: true,
                            message: 'Invalid user Credentials',
                          });
                        });

                      setFromSignIn({
                        email: '',
                        password: '',
                      });
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setSignUpAction(prev => !prev);
                    }}
                  >
                    Sign Up Page
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
