import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  SlideFade,
  Icon,
  Input,
  Text,
  Flex,
  Pressable,
  Button,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { fetchGraphQL, useField } from '../../utils/helperFunctions';

import { Fab } from '../../components';
import DisplayFriendRow from './DisplayFriendRow';
import AddFriendModal from './AddFriendModal';
import { GET_FRIENDS } from '../../utils/schemas';

import { reloadFriends } from '../../redux/actions/friends';

const FriendsScreen = ({ navigation, friendsState, userState, reloadFriends }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const search = useField('text', '');

  const handleSearchToggle = () => {
    setShowSearch((e) => !e);
  };

  const handleSettingsToggle = () => {};

  return (
    <VStack space="4" p="4" flex="1" safeArea>
      <HStack flex="1" justifyContent="space-between">
        <Flex flex="5">
          <Text fontSize="3xl">Friends</Text>
        </Flex>

        <HStack
          alignContent="center"
          justifyContent="space-between"
          flex="1"
          p="2"
        >
          <Pressable onPress={handleSearchToggle} m="auto">
            <Icon as={<Feather name="search" />} size="sm" />
          </Pressable>
          <Pressable onPress={handleSettingsToggle} m="auto">
            <Icon as={<Feather name="more-vertical" />} size="sm" />
          </Pressable>
        </HStack>
      </HStack>

      <SlideFade in={showSearch}>
        <Box h={showSearch ? '8' : '0'} px={showSearch ? '4' : '0'}>
          {showSearch && <Input {...search} placeholder="search" />}
        </Box>
      </SlideFade>

      <VStack flex="15">
        {friendsState.list.map((friend) => (
          <DisplayFriendRow
            key={friend.id}
            user={friend}
            navigation={navigation}
          />
        ))}
        {/*user.friends.map((friend) => (
        <FriendRow
          key={friend.id}
          username={friend.username}
          profile_pic_url={friend.profile_pic_url}
          navigation={navigation}
        />
      ))*/}
        <Flex flex="5">
          <Text fontSize="3xl">Pending them</Text>
        </Flex>
        {friendsState.pendingThem.map((friend) => (
          <DisplayFriendRow
            key={friend.id}
            user={friend}
            navigation={navigation}
          />
        ))}
      </VStack>
      <Fab iconName="plus" onPress={() => setIsAdding(true)} />
      <AddFriendModal isOpen={isAdding} onClose={() => setIsAdding(false)} />
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({
  reloadFriends: (friends) => dispatch(reloadFriends(friends)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);
