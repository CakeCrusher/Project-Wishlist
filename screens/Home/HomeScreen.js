import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, HStack, VStack, ScrollView } from 'native-base';

import { ScreenContainer, ListPreview, InnerTitle } from '../../components';

import { Flare } from '../../components';
import Feed from './Feed';

const HomeScreen = ({ userState, friendsState, navigation }) => {
  const handleLoadList = (listData, userData) => {
    navigation.navigate('Home', {
      screen: 'List',
      params: {
        listData,
        userData,
      },
    });
  };

  //console.log(splitFriends);
  let timeNow = new Date().toLocaleDateString();
  // transform time to readable format
  return (
    <ScreenContainer>
      <ScrollView stickyHeaderIndices={[0, 3]}>
        <HStack justifyContent="space-between" bg="#f1f1f1">
          <Text fontSize="md">Hello, {userState.username}</Text>
          <Text fontSize="md">{timeNow}</Text>
        </HStack>

        <InnerTitle>Recent</InnerTitle>
        <VStack flex="5" space="2">
          {userState.lists[0] ? (
            <>
              <ListPreview
                onPress={() => handleLoadList(userState.lists[0], userState)}
                username={userState.username}
                listData={userState.lists[0]}
                flex="1"
              />
              <Button
                mt="2"
                _text={{ fontSize: 'xl' }}
                variant="outline"
                onPress={() => navigation.navigate('My Lists')}
              >
                All Lists
              </Button>
            </>
          ) : (
            <>
              <Text>You have not lists yet. Create one in "My Lists"!</Text>
            </>
          )}
        </VStack>

        <InnerTitle bg="#f1f1f1" w="100%">
          Activity
        </InnerTitle>
        <VStack flex="7" space="2">
          <Feed handleLoadList={handleLoadList} />
        </VStack>
      </ScrollView>
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
