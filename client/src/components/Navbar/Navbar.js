import {
  Button,
  Flex,
  Image,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Text,
  Heading,
} from '@chakra-ui/react';
import React from 'react';

import { FiMenu } from 'react-icons/fi';
import logo from '../../assets/HandyBW.png';
import profile from '../../assets/profile.png';
import NavModal from './NavModal';
import { useUser } from '../../hooks/userHooks';

const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const userInfo = useUser();

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
            {!userInfo.isLoggedIn ? (
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
              <HStack spacing="3" py="5px" alignItems="center">
                <Heading onClick={onOpen} fontSize="3xl">
                  Hi, {userInfo.user ? userInfo.user.name.first : 'mrX'}
                </Heading>
                <Image
                  boxSize="45px"
                  objectFit="conver"
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
              onClick={onOpen}
            />
          </>
        )}
      </HStack>

      {/*  NavModal -> Pop up menu with sign-up and sign-in options or account information */}

      <NavModal
        initialRef={initialRef}
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </>
  );
};

export default Navbar;
