import { ChakraProvider, Box, HStack, theme } from '@chakra-ui/react';

import { Navbar } from './components/Navbar/Navbar';
import DetecorWindow from './components/Detector/Detector';
import useAuth from './hooks/useAuth';

function App() {
  const [isLoggedIn, userInfo, signIn, signUp, logout] = useAuth();

  return (
    <ChakraProvider theme={theme}>
      <Box width="100vw" height="100vh">
        <Box width={'100%'} position="fixed" background={'white'} zIndex="99">
          <Navbar
            isLoggedIn={isLoggedIn}
            auth={{
              user: userInfo,
              signIn: signIn,
              logout: logout,
              signUp: signUp,
            }}
          />
        </Box>
        <Box py={{ base: '4', lg: '5' }} pt={{ base: '14px', lg: '14px' }}>
          <HStack
            margin="auto"
            spacing="0"
            justify="space-between"
            width={['95%', '90%', '90%', '90%', '85%']}
            maxW="1500px"
          >
            <DetecorWindow isLoggedIn={isLoggedIn} userInfo={userInfo} />
          </HStack>

          {/* <Button onClick={signIn}> sign in</Button>
        <Button onClick={addUser}> checker</Button>
        
        <Text>{JSON.stringify(userInfo)}</Text> */}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
