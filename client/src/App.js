import { Box, HStack } from '@chakra-ui/react';

import Navbar from './components/Navbar/Navbar';
import DetecorWindow from './components/Detector/Detector';

function App() {
  return (
    <Box width="100vw" height="100vh" overflowX="hidden">
      <Box width={'100%'} position="fixed" background={'white'} zIndex="99">
        <Navbar />
      </Box>
      <Box py={{ base: '4', lg: '5' }} pt={{ base: '14px', lg: '14px' }}>
        <HStack
          margin="auto"
          spacing="0"
          justify="space-between"
          width={['95%', '90%', '90%', '90%', '85%']}
          maxW="1500px"
        >
          <DetecorWindow />
        </HStack>
      </Box>
    </Box>
  );
}

export default App;
