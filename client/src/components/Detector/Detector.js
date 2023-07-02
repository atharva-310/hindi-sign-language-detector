import {
  Flex,
  Tooltip,
  Box,
  HStack,
  Image,
  Text,
  Button,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';

import { BiUserVoice } from 'react-icons/bi';
import { HiStop } from 'react-icons/hi';
import { RiVoiceprintLine, RiBodyScanFill } from 'react-icons/ri';
import hero from '../../assets/hero.png';
import Annotate from './DetectorBrain';

import Info from './InfoPanel';
import Instruction from './Instruction';

export default function Detector(props) {
  const detectorWindowRef = useRef(null);
  const [dectectorOn, setDetector] = useState(false);
  const [pastPredictions, setPastPredictions] = useState('');
  const [predction, setPrediction] = useState({
    data: '',
    confidence: '',
  });
  const [wantAudio, setAudio] = useState(false);
  const value = useBreakpointValue(
    {
      base: true,
      xs: true,
      sm: true,
      md: true,
      lg: false,
    },
    { ssr: false }
  );
  const hideImage = useBreakpointValue({
    base: true,
    xs: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });
  const synth = window.speechSynthesis;

  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();
  }

  // Function will use browser api to read the message
  function speak(message) {
    if (message !== '') {
      const utterThis = new SpeechSynthesisUtterance(message);

      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
      };
      const selectedOption = 'Google हिन्दी';
      utterThis.voice = voices.find(voice => voice.name === selectedOption);
      synth.speak(utterThis);
    }
  }

  return (
    <>
      <Flex
        mt="100px"
        width="100%"
        flexWrap="wrap"
        flexDirection={value ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          width={value ? '100%' : '65%'}
          height={['300px', '400px', '500px', '570px']}
          borderRadius="20px"
          boxShadow="dark-lg"
          rounded="lg"
          bg="#F9F5F2"
          px={hideImage ? '8px' : '30px'}
          ref={detectorWindowRef}
        >
          {dectectorOn ? (
            <>
              <Annotate
                detectorOptions={{
                  setPastPredictions: setPastPredictions,
                  setPrediction: setPrediction,
                  wantAudio: wantAudio,
                  ref: detectorWindowRef,
                }}
              />
            </>
          ) : (
            <HStack
              height="100%"
              justify={hideImage ? 'center' : 'space-between'}
            >
              {hideImage ? (
                ''
              ) : (
                <Box maxW="350px">
                  <Image src={hero} maxH="90%" />
                </Box>
              )}
              <Instruction />
            </HStack>
          )}
        </Box>
        <Flex
          justifyContent="space-between"
          direction="column-reverse"
          width={value ? '100%' : '35%'}
          pl={value ? '0' : '3%'}
          marginTop={value ? '30px' : ''}
          height={['auto', 'auto', 'auto', '570px']}
          borderRadius="20px"
        >
          <Box
            bg="white"
            minH="67%"
            boxShadow="dark-lg"
            rounded="lg"
            pt="15px"
            pb="15px"
            px="20px"
            mt="10px"
          >
            <Info
              {...props}
              detectorOptions={{
                dectectorOn: dectectorOn,
                prediction: predction,
              }}
            />
          </Box>
          <Box
            bg="#2C5282"
            minH="30%"
            boxShadow="dark-lg"
            rounded="lg"
            p="20px"
          >
            <VStack width="100%" justifyContent="space-evenly" height="100%">
              <HStack width="98%" justifyContent="space-between">
                <Tooltip label="Click Start to Predict" aria-label="A tooltip">
                  <Box
                    bg="white"
                    minW="60%"
                    height="48px"
                    rounded="lg"
                    // padding="10px"
                  >
                    <Text fontSize="18px">
                      <Button
                        size="lg"
                        colorScheme="white"
                        // leftIcon={<RiVoiceprintLine fontSize="30px" />}
                        color="black"
                        disabled
                      >
                        {pastPredictions.length < 2
                          ? 'Past Prediction'
                          : pastPredictions}
                      </Button>
                    </Text>
                  </Box>
                </Tooltip>

                <Button
                  disabled={!props.isLoggedIn && !props.userInfo}
                  size="lg"
                  padding="10px"
                  colorScheme="yellow"
                  leftIcon={<RiVoiceprintLine fontSize="25px" />}
                  onClick={() => {
                    // console.log('test');
                    populateVoiceList();
                    speak(pastPredictions);
                  }}
                >
                  Read
                </Button>
              </HStack>
              <HStack
                color="white"
                width="98%"
                mt="10px"
                justify="space-around"
              >
                <Button
                  disabled={!props.isLoggedIn && !props.userInfo}
                  width="35%"
                  size="lg"
                  colorScheme="green"
                  leftIcon={<RiBodyScanFill fontSize="30px" />}
                  variant="solid"
                  onClick={() => {
                    // console.log(dectectorOn);
                    if (!dectectorOn) {
                      setDetector(true);
                    }
                  }}
                >
                  Play
                </Button>
                <Button
                  disabled={!props.isLoggedIn && !props.userInfo}
                  width="35%"
                  size="lg"
                  colorScheme="red"
                  leftIcon={<HiStop fontSize="30px" />}
                  variant="solid"
                  onClick={() => {
                    setDetector(false);
                  }}
                >
                  Stop
                </Button>
                <Button
                  bg="white"
                  variant="solid"
                  width="20%"
                  disabled={
                    !props.isLoggedIn && !props.userInfo && !dectectorOn
                  }
                  onClick={() => {
                    setAudio(prevState => !prevState);
                  }}
                >
                  <BiUserVoice
                    fontSize="35px"
                    color={wantAudio ? 'red' : 'black'}
                    fontWeight="900"
                  />
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
