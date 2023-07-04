import {
  Tag,
  TagLabel,
  Box,
  Text,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  HStack,
} from '@chakra-ui/react';

const stepsData = [
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
  {
    title: 'Predictions',
    describe:
      'You can monitor your past prediction and live on the control and info panel',
  },
];

export const Steps = stepsData.map((step, index) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <HStack flex="1">
            <Tag
              size="lg"
              bg="#319795"
              color="white"
              borderRadius="full"
              mr="5px"
            >
              <TagLabel>{'Step ' + (index + 1)}</TagLabel>
            </Tag>
            <Text fontWeight="600" fontSize="20px" textAlign="center">
              {step.title}
            </Text>
          </HStack>
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
