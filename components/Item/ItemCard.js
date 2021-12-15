import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
  Flex,
  Icon,
  Image,
  Text,
  Center,
  Box,
  VStack,
  HStack,
  ZStack,
  Pressable,
  Checkbox,
} from 'native-base';

const ItemCard = (props) => {
  const { item, handlePress, check } = props;
  const styles = { ...props };
  delete styles.item;
  delete styles.handlePress;
  delete styles.check;
  // console.log('item', );
  const imageToShow = item.image_url || 'https://via.placeholder.com/150';
  return (
    <ZStack minH="48" {...styles}>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        h="95%"
        w="95%"
        bg="#DEDEDE"
        borderRadius="8"
      />

      <Box
        position="absolute"
        bottom="2"
        left="2"
        h="95%"
        w="95%"
        bg="#FFF"
        borderRadius="8"
      >
        <Pressable onPress={handlePress}>
          <VStack p="2">
            <Flex alignItems="center" justifyContent="center">
              <Image
                opacity={item.status ? 0.4 : 1}
                source={{ uri: imageToShow }}
                alt="item"
                size="xl"
              />
            </Flex>
            <VStack mt="2">
              <Text fontSize="md" fontWeight="bold" textAlign="center">
                {item.name}
              </Text>
            </VStack>
          </VStack>
        </Pressable>
      </Box>
      <HStack
        position="absolute"
        h="8"
        right="2"
        justifyContent="flex-end"
        alignItems="center"
      >
        {item.status && (
          <Center
            rounded="full"
            bg="primary.500"
            w="6"
            h="6"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              ml="auto"
              as={<Feather name="check" />}
              size="sm"
              color="white"
            />
          </Center>
        )}
        {check && (
          <Center w="6" h="6" alignItems="center" justifyContent="center">
            <Pressable {...check}>
              <Checkbox
                onPress={check.onPress}
                colorScheme="danger"
                accessibilityLabel="Test"
              />
            </Pressable>
          </Center>
        )}
      </HStack>
    </ZStack>
  );
};

export default ItemCard;
