import {
  VStack,
  HStack,
  Box,
  Image,
  Accordion,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';

import hero from '../../../assets/hero.png';
import girl from '../../../assets/girl.png';
import { Steps } from './Steps';

export default function Instruction() {
  const hideImage = useBreakpointValue({
    base: true,
    xs: true,
    sm: true,
    md: true,
    lg: false,
    xl: false,
  });

  return (
    <HStack
      mx={hideImage ? '8px' : '30px'}
      height="100%"
      justify={hideImage ? 'center' : 'space-evenly'}
      alignItems="center"
    >
      {!hideImage && (
        <Box maxW={{ md: '250px', lg: '30px', xl: '300px' }}>
          <Image src={hero} maxH="90%" />
        </Box>
      )}
      <VStack height="80%" maxH="90%" overflowY="scroll">
        <HStack justifyContent="flex-end">
          <Heading
            fontSize="30px"
            fontWeight="900"
            pt="15px"
            pl="0"
            margin="0"
            fontFamily="mono"
            align="right"
            width="69%"
          >
            How to use Handy ?
          </Heading>
          <Box width="40%">
            <Image src={girl} maxH="100px" />
          </Box>
        </HStack>
        <Box width="95%" height="2px" bg="black" mt="11px">
          <Accordion allowToggle textAlign="center">
            {Steps}
          </Accordion>
        </Box>
      </VStack>
    </HStack>
  );
}
