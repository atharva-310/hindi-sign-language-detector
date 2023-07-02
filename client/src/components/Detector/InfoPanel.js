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
export default function InfoPanel(props) {
  return (
    <VStack>
      <Box>
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
            {props.detectorOptions.dectectorOn
              ? 'Predictions'
              : ' Hi, I Am Handy The Detetor !!'}
          </Heading>
          <Image src={Robu} height="80px" />
        </HStack>
        <Box width="50%" height="2px" bg="black" m="11px"></Box>
        {props.detectorOptions.dectectorOn ? (
          <>
            <HStack>
              <Text
                mb="10px"
                letterSpacing="-0.5px"
                // fontSize="lg"
                // fontFamily="mono"
                fontSize="80px"
                pl="14px"
                mt="5px"
              >
                {props.detectorOptions.prediction.data}
              </Text>
              <Text
                mb="10px"
                letterSpacing="-0.5px"
                // fontSize="lg"
                // fontFamily="mono"
                fontSize="80px"
                pl="14px"
                mt="5px"
              >
                {props.detectorOptions.prediction.confidence}
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
              I am a hindi sign language detector.I can help you learn hindi
              sign language with audio and visual feedback.
            </Text>
            {props.isLoggedIn ? (
              <Alert borderRadius="lg" status="success">
                <AlertIcon />
                Hurry you have logged In 🥳😃
              </Alert>
            ) : (
              <Alert borderRadius="lg" status="error">
                <AlertIcon />
                You have to Login to use the Handy!!
              </Alert>
            )}
          </>
        )}
      </Box>
    </VStack>
  );
}
