import React from 'react';
import {
  Image,
  VStack,
  Alert,
  Box,
  HStack,
  AlertIcon,
  Text,
  Heading,
} from '@chakra-ui/react';
import Robu from '../../assets/robu.png';
import { useUser } from '../../hooks/userHooks';

export default function InfoPanel({ detectorOptions }) {
  const { dectectorOn, prediction } = detectorOptions;
  const { isLoggedIn } = useUser();
  return (
    <Box
      bg="white"
      minH="67%"
      boxShadow="dark-lg"
      rounded="lg"
      py="15px"
      px="20px"
      mt="10px"
    >
      <HStack alignItems="center" width="98%">
        <Heading
          fontSize="30px"
          fontWeight="900"
          pt="15px"
          pl="10px"
          margin="0"
          fontFamily="mono"
          align="left"
          width="69%"
        >
          {dectectorOn ? 'Predictions' : ' Hi, I Am Handy The Detetor !!'}
        </Heading>
        <Image src={Robu} height="80px" />
      </HStack>
      <Box width="50%" height="2px" bg="black" m="11px"></Box>
      {dectectorOn ? (
        <>
          <HStack>
            <Text
              mb="10px"
              letterSpacing="-0.5px"
              fontSize="80px"
              pl="14px"
              mt="5px"
            >
              {prediction.data}
            </Text>
            <Text
              mb="10px"
              letterSpacing="-0.5px"
              fontSize="80px"
              pl="14px"
              mt="5px"
            >
              {prediction.confidence}
            </Text>
          </HStack>
          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            Number followed by letter represents confidence level on the
            predicted result.
          </Alert>
        </>
      ) : (
        <>
          <Text
            mb="10px"
            letterSpacing="-0.5px"
            fontSize="lg"
            fontFamily="mono"
            pl="14px"
            mt="5px"
          >
            I am a hindi sign language detector.I can help you learn hindi sign
            language with audio and visual feedback.
          </Text>

          <Alert borderRadius="lg" status={isLoggedIn ? 'success' : 'error'}>
            <AlertIcon />
            {isLoggedIn
              ? ' Hurry you have logged In 🥳😃'
              : ' You have to Login to use the Handy!!'}
          </Alert>
        </>
      )}
    </Box>
  );
}
