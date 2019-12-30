import React from 'react';
import {View} from 'react-native';
import SInfo from 'react-native-sensitive-info';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    SInfo.getItem('userLoggedIn', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(userLoggedIn => {
      this.props.navigation.navigate(userLoggedIn == 'true' ? 'App' : 'Auth');
    });
  }

  render() {
    return <View />;
  }
}
