import React, {Component} from 'react';
import {View} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import {GoogleSignin} from 'react-native-google-signin';
import globalConfigs from '../../api/GlobalConfigs';

export default class index extends Component {
  async componentDidMount() {
    this._configureGoogleSignIn();
    SInfo.deleteItem('userLoggedIn', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    SInfo.deleteItem('name', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    SInfo.deleteItem('email', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    SInfo.deleteItem('userStatus', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    SInfo.deleteItem('userPic', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    this.props.navigation.navigate('Auth');
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: globalConfigs.googleClientIdDebug, //Replace with your own client id
      offlineAccess: false,
    });
  }

  render() {
    return <View></View>;
  }
}
