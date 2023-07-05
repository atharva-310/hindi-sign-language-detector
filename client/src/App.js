import { Box, HStack } from '@chakra-ui/react';

import Navbar from './components/Navbar/Navbar';
import DetectorPage from './components/Detector/DetectorPage';
import { useSetUser, useUser } from './hooks/userHooks';
import { useEffect } from 'react';

function App() {
  const setUser = useSetUser();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    async function checkStorage() {
      const data = localStorage.getItem('userInfo');
      if (data) {
        const userInfo = JSON.parse(data);
        if (userInfo?.token) {
          const response = await fetch('/protected/check', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          const data = await response.json();
          if (data.status === 'success') {
            setUser({
              isLoggedIn: true,
              ...data.payload,
            });
            return;
          } else {
            localStorage.removeItem('userInfo');
            return;
          }
        }
      }
    }
    if (!isLoggedIn) checkStorage();
  }, []);
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
          <DetectorPage />
        </HStack>
      </Box>
    </Box>
  );
}

export default App;
