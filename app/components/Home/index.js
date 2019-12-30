import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home';
import Content from './Explore/Content';

export default HomeStackNavigator = createStackNavigator(
  {
    HomeStackNavigator: {
      screen: Home,
      navigationOptions: {
        gesturesEnabled: true,
        title: 'Aveti',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    ContentScreen: {
      screen: Content,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <TouchableOpacity
            style={{paddingLeft: 15}}
            onPress={() => navigation.openDrawer()}>
            <Image source={require('../../assets/drawer_icon.png')} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#6689ff',
        },
      };
    },
  },
);
