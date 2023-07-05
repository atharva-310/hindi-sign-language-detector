import { Flex, Box, HStack, Image, useBreakpointValue } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import useSpeech from '../../hooks/useSpeech';
import Detector from './Detector';
import Instruction from './Instructions/Instruction';
import ControlPanel from './ControlPanel';
import Info from './InfoPanel';

export default function DetectorPage() {
  const detectorWindowRef = useRef(null);

  // Detector states
  const [dectectorOn, setDetector] = useState(false);
  const [wantAudio, setAudio] = useState(false);
  const [pastPredictions, setPastPredictions] = useState('');
  const [predction, setPrediction] = useState({
    data: '',
    confidence: '',
  });
  const { isAudioSupported, speak } = useSpeech();
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
          ref={detectorWindowRef}
        >
          {dectectorOn && detectorWindowRef ? (
            <Detector
              detectorOptions={{
                setPastPredictions: setPastPredictions,
                setPrediction: setPrediction,
                wantAudio: wantAudio,
                detectorWindowRef: detectorWindowRef,
              }}
              isAudioSupported={isAudioSupported}
              speak={speak}
            />
          ) : (
            <Instruction />
          )}
        </Box>
        <Flex
          justifyContent="space-between"
          direction="column"
          width={value ? '100%' : '35%'}
          pl={value ? '0' : '3%'}
          marginTop={value ? '30px' : ''}
          height={['auto', 'auto', 'auto', '570px']}
          borderRadius="20px"
        >
          <ControlPanel
            pastPredictions={pastPredictions}
            wantAudio={wantAudio}
            setAudio={setAudio}
            dectectorOn={dectectorOn}
            setDetector={setDetector}
            speak={speak}
            isAudioSupported={isAudioSupported}
          />
          <Info
            detectorOptions={{
              dectectorOn: dectectorOn,
              prediction: predction,
            }}
          />
        </Flex>
      </Flex>
    </>
  );
}
