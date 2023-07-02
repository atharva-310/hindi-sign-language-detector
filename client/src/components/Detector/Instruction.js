import {
  Tag,
  TagLabel,
  VStack,
  HStack,
  Box,
  Image,
  Text,
  AccordionItem,
  Accordion,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Heading,
} from '@chakra-ui/react';

import girl from '../../assets/girl.png';

const steps = [
  {
    title: 'Login/Create Account ',
    describe:
      ' In the top right corner you will find the login/SignIn Button.To use the detector you need to create or login with your account.',
  },
  {
    title: 'Camera setup ',
    describe:
      'Make sure that you have a active webcam and have sufficient light in the room. ',
  },
  {
    title: 'Use control panel',
    describe: 'Use the control panel to start and stop the detector. ',
  },
];
export default function Instruction() {
  const CordianItems = steps.map((step, index) => {
    return (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text fontWeight="600" fontSize="20px">
                <Tag
                  size="lg"
                  bg="#319795"
                  color="white"
                  borderRadius="full"
                  mr="5px"
                >
                  <TagLabel>{'Step ' + (index + 1)}</TagLabel>
                </Tag>
                {step.title}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text letterSpacing="-1px" pl="20px">
            {step.describe}
          </Text>
        </AccordionPanel>
      </AccordionItem>
    );
  });
  return (
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
        <Accordion allowToggle>{CordianItems}</Accordion>
      </Box>

      <Box fontFamily="mono" fontSize="xl" p="20px"></Box>
    </VStack>
  );
}
