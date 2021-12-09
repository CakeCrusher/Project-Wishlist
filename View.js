import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import { Feather } from '@expo/vector-icons';
import { Icon } from 'native-base';

import { signinById } from './redux/actions/user';
import { Home, Login, Friends, MyLists, Account } from './screens';

const Tab = createBottomTabNavigator();

const View = ({ signinById, userState }) => {
  useEffect(() => {
    const retrieveUserId = async () => {
      if (!userState.user) {
        const userId = await AsyncStorage.getItem('user_id');
        if (userId) {
          console.log('Logged in with: ', userId);
          signinById({ userId });
        } else {
          console.log('Not logged in');
        }
      }
    };
    retrieveUserId();
  }, []);

  if (userState.user) {
    console.log(userState);
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Feather name="home" size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Friends"
            component={Friends}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Feather name="users" size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="My Lists"
            component={MyLists}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Feather name="list" size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Feather name="user" size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return <Login />;
};

const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  signinById: (user_id) => dispatch(signinById(user_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
