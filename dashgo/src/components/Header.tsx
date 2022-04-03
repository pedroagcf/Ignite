import { Box, Flex, HStack, Icon, Input, Text, Avatar } from '@chakra-ui/react';
import {
  RiSearchLine,
  RiNotificationLine,
  RiUserAddLine,
} from 'react-icons/ri';
export default function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" color="pink.500" ml="1">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: 'gray.400' }}
        />
        <Icon as={RiSearchLine} />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>
        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Pedro Augusto</Text>
            <Text color="gray.300" fontSize="small">
              26pedrocastro@gmail.com
            </Text>
          </Box>
          <Avatar
            size="md"
            name="Pedro Augusto"
            src="https://github.com/pedroagcf.png"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
