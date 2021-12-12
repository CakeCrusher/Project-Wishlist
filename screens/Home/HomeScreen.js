import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as Contacts from 'expo-contacts';
import { Text, Button, HStack, VStack, Box, ScrollView } from 'native-base';

import { ListPreview } from '../../components';

import { setUser, logout } from '../../redux/actions/user';
import MockApi from '../../utils/MockApi';

const HomeScreen = ({ userState, friendsState, logout, navigation }) => {
  const handleLoadList = (listData) => {
    navigation.navigate('Home', {
      screen: 'List',
      params: {
        listData,
      },
    });
  };

  const friendsWithLists = friendsState.list.filter(
    (friend) => friend.lists.length > 0,
  );
  const splitFriends = [];
  for (let i = 0; i < friendsWithLists.length; i++) {
    if (i % 2 === 0) {
      splitFriends.push([friendsWithLists[i]]);
    } else {
      splitFriends[splitFriends.length - 1].push(friendsWithLists[i]);
    }
  }
  console.log(splitFriends);

  return (
    <VStack space="2" m="4" flex="1" justifyContent="space-between" safeArea>
      <HStack justifyContent="space-between">
        <Text fontSize="md">Hello, {userState.username}</Text>
        <Text fontSize="md">Nov, 28</Text>
      </HStack>

      <VStack flex="5" space="2">
        <Text fontSize="2xl">Recent</Text>
        {userState.lists[0] && (
          <>
            <ListPreview
              onPress={() => handleLoadList(userState.lists[0])}
              username={userState.username}
              listData={userState.lists[0]}
              flex="1"
            />
            <Button
              mt="2"
              variant="outline"
              onPress={() => navigation.navigate('My Lists')}
            >
              All Lists
            </Button>
          </>
        )}
      </VStack>

      <VStack flex="7" space="2" overflow="scroll">
        <Text fontSize="2xl">Friends</Text>
        <VStack flex="1" space="2" flexWrap="wrap">
          {friendsWithLists.length > 0 &&
            splitFriends.map((listPair) => (
              <HStack flex="1">
                {listPair.map((friend, index) => (
                  <Box h="40" w="48%">
                    <ListPreview
                      key={index}
                      username={friend.username}
                      listData={friend.lists[0]}
                      onPress={() => handleLoadList(friend.lists[0])}
                      flex="1"
                    />
                  </Box>
                ))}
              </HStack>
            ))}
          {/*friendsWithLists.length > 0 &&
            friendsWithLists.map((friend, index) => {
              if (index % 2 === 0) {
                return (
                  <Box w="45%">
                    <ListPreview
                      key={index}
                      username={friend.username}
                      listData={friend.lists[0]}
                      onPress={() => handleLoadList(friend.lists[0])}
                      flex="1"
                      maxH="79"
                    />
                  </Box>
                );
              } else {
                return (
                  <Box w="45%">
                    <ListPreview
                      key={index}
                      username={friend.username}
                      listData={friend.lists[0]}
                      onPress={() => handleLoadList(friend.lists[0])}
                      flex="1"
                      maxH="10"
                    />
                  </Box>
                );
              }
            })*/}
        </VStack>
      </VStack>
      <VStack>
        <Button onPress={() => logout()}>logout</Button>
      </VStack>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
