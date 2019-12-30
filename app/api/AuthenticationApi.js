import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import globalConfigs from './GlobalConfigs';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'react-native-firebase';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const LoginApi = data => {
  console.log(globalConfigs.baseUrl +
    '/Authentication/authenticate?userid=' +
    data.user.id +
    '&name=' +
    data.user.name +
    '&email= ' +
    data.user.email +
    '&socialaccount=' +
    'googlePlus' +
    '&token=' +
    data.idToken +
    '&iconURL=' +
    data.user.photo)
  return axios
    .post(
      globalConfigs.baseUrl +
        '/Authentication/authenticate?userid=' +
        data.user.id +
        '&name=' +
        data.user.name +
        '&email= ' +
        data.user.email +
        '&socialaccount=' +
        'googlePlus' +
        '&token=' +
        data.idToken +
        '&iconURL=' +
        data.user.photo,
      headers,
    )
    .then(res => {
      console.log(res.data)
      SInfo.setItem(
        'Authentication',
        JSON.stringify(res.headers['set-cookie']),
        {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        },
      );
      return res;
    })
    .catch(error => {
      console.log(
        'parsing failed at app/api/AuthenticationApi/ in LoginApi() for Google Login',
        error,
      );
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          firebase.analytics().logEvent('OAuth_Failed', {
            name: data.user.name,
            email: data.user.email,
            state: 'error in authentication api and net is connected',
            error: error.toString(),
          });
          Alert.alert(
            'We came across an issue',
            'We are working to continously improve.',
            [
              {
                text: 'OK',
                onPress: () => {
                  return 'no net connection';
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          firebase.analytics().logEvent('OAuth_Failed', {
            name: data.user.name,
            email: data.user.email,
            state: 'error in authentication api and net is not connected',
            error: error.toString(),
          });
          Alert.alert(
            'No Internet Connection',
            'Please Check Your Internet Connection',
            [
              {
                text: 'OK',
                onPress: () => {
                  return 'no net connection';
                },
              },
            ],
            {cancelable: false},
          );
        }
      });
    });
};
