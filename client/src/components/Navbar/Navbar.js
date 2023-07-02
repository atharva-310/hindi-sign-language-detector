import {
  Button,
  Flex,
  Image,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import { FiMenu } from 'react-icons/fi';
import logo from '../../assets/HandyBW.png';
import profile from '../../assets/profile.png';
import AuthModal from './AuthModal';

export const Navbar = props => {
  const { isLoggedIn, auth } = props;
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const btnRef = React.useRef(null);

  return (
    <>
      <HStack
        as="nav"
        h={'100px'}
        width={['90vw', '90vw', '95vw', '95vw', '85vw']}
        maxW="1500px"
        margin="auto"
        py={{ base: '4', lg: '5' }}
        pt={{ base: '14px', lg: '14px' }}
        bg="bg-surface"
        justify="space-between"
      >
        <Image src={logo} boxShadow="xl" borderRadius="lg" height="4rem" />
        {isDesktop ? (
          <Flex justify="flex-end" flex="1">
            {!isLoggedIn ? (
              <Button
                variant="solid"
                size="lg"
                bg="black"
                color="white"
                onClick={onOpen}
              >
                Login
              </Button>
            ) : (
              <HStack spacing="3" py="5px">
                <Text
                  fontWeight="600"
                  mt="13px"
                  align="left"
                  fontSize="24px"
                  onClick={onOpen}
                >
                  Hi, {auth.user ? auth.user.name.first : 'mrX'}
                </Text>
                <Image
                  boxSize="45px"
                  objectFit="conver"
                  borderRadius="20%"
                  onClick={onOpen}
                  src={profile}
                  alt="Dan Abramov"
                />
              </HStack>
            )}
          </Flex>
        ) : (
          <>
            <IconButton
              variant="ghost"
              icon={<FiMenu fontSize="1.25rem" />}
              aria-label="Open Menu"
              ref={btnRef}
              onClick={onOpen}
            />
          </>
        )}
      </HStack>

      {/*  AuthModal -> Pop up menu with all sign-up and sign-in options */}

      <AuthModal
        initialRef={initialRef}
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        {...props}
      />
    </>
  );
};
