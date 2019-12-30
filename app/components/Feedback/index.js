import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Feedback from './Feedback';

export default FeedbackStackNavigator = createStackNavigator(
  {
    FeedbackStackNavigator: {
      screen: Feedback,
      navigationOptions: {
        gesturesEnabled: true,
        title: 'Aveti',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
