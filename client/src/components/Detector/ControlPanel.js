import {
  Tooltip,
  Box,
  HStack,
  Text,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { BiUserVoice } from 'react-icons/bi';
import { HiStop } from 'react-icons/hi';
import { RiVoiceprintLine, RiBodyScanFill } from 'react-icons/ri';
import { useUser } from '../../hooks/userHooks';
import useSpeech from '../../hooks/useSpeech';
import { toastOption } from '../../utils';

const ControlPanel = ({
  pastPredictions,
  wantAudio,
  setAudio,
  dectectorOn,
  setDetector,
  speak,
  isAudioSupported,
}) => {
  const { isLoggedIn } = useUser();
  const toast = useToast();
  return (
    <Box bg="#2C5282" minH="30%" boxShadow="dark-lg" rounded="lg" p="20px">
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
                  isDisabled={true}
                >
                  {pastPredictions.length < 2
                    ? 'Past Prediction'
                    : pastPredictions}
                </Button>
              </Text>
            </Box>
          </Tooltip>

          <Button
            isDisabled={!isLoggedIn || !isAudioSupported}
            size="lg"
            padding="10px"
            colorScheme="yellow"
            leftIcon={<RiVoiceprintLine fontSize="25px" />}
            onClick={() => {
              if (isAudioSupported) speak(pastPredictions);
            }}
          >
            Read
          </Button>
        </HStack>
        <HStack color="white" width="98%" mt="10px" justify="space-around">
          <Button
            isDisabled={!isLoggedIn}
            width="35%"
            size="lg"
            colorScheme="green"
            leftIcon={<RiBodyScanFill fontSize="30px" />}
            variant="solid"
            onClick={() => {
              if (!dectectorOn) {
                setDetector(true);
              }
            }}
          >
            Play
          </Button>
          <Button
            isDisabled={!isLoggedIn}
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
            isDisabled={!isLoggedIn || dectectorOn}
            onClick={() => {
              if (isAudioSupported) {
                setAudio(prevState => !prevState);
              } else {
                toast({
                  ...toastOption,
                  title: 'Audio Feedback is not supported !',
                  description: 'We suggest using Chrome to use this feature.',
                  status: 'warning',
                });
              }
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
  );
};

export default ControlPanel;
