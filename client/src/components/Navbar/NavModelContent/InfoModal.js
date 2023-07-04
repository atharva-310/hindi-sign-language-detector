import {
  Box,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Image,
  HStack,
  Text,
  ModalOverlay,
  Modal,
  ModalContent,
} from '@chakra-ui/react';
import profile from '../../../assets/profile.png';
import { useUser } from '../../../hooks/userHooks';
import useAuth from '../../../hooks/useAuth';

/**
 * @param { onOpen, onClose }
 *  - Refrences to open and close the modal
 * @returns
 *  - Return a component that will display the Account details of the logged in user
 */

export const InfoModal = ({
  initialRef,
  finalRef,
  isOpen,
  onClose,
  onOpen,
}) => {
  const userInfo = useUser().user;
  const { logout } = useAuth();
  return (
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
                  {userInfo
                    ? userInfo.name?.first + ' ' + userInfo.name?.last
                    : 'mrX'}
                </Text>
                <Text as="i" size="md">
                  {userInfo ? userInfo.email : 'mrX@gamil.com'}
                </Text>
              </Box>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                logout();
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
  );
};
