import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthLoadingScreen from './app/components/GoogleLogin/AuthLoadingScreen';
import GoogleLogin from './app/components/GoogleLogin/index';
import Home from './app/components/Home/index';
import {createDrawerNavigator} from 'react-navigation-drawer';
import InterestArea from './app/components/InterestArea/index';
import Sidebar from './app/components/Sidebar/index';
import Logout from './app/components/Logout/index';
import Feedback from './app/components/Feedback/index';
import firebase from 'react-native-firebase';

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    InterestArea: {
      screen: InterestArea,
    },
    Feedback: {
      screen: Feedback,
    },
    Logout: {
      screen: Logout,
    },
  },
  {
    contentComponent: Sidebar,
    animationEnabled: true,
    swipeEnabled: true,
    navigationOptions: {
      gesturesEnabled: true,
    },
  },
);

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: GoogleLogin,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <AppContainer
    onNavigationStateChange={(prevState, currentState, action) => {
      const currentScreen = getActiveRouteName(currentState);
      const prevScreen = getActiveRouteName(prevState);
      if (prevScreen !== currentScreen) {
        firebase.analytics().setCurrentScreen(currentScreen);
      }
    }}
  />
);
