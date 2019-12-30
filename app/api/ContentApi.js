import axios from 'axios';
import globalConfigs from './GlobalConfigs';
import SInfo from 'react-native-sensitive-info';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'set-cookie': '',
};

SInfo.getItem('Authentication', {
  sharedPreferencesName: 'mySharedPrefs',
  keychainService: 'myKeychain',
}).then(value => {
  headers['set-cookie'] = JSON.parse(value);
});

export const GetContentApi = data => {
  console.log(
    'GetContentApi URL',
    globalConfigs.baseUrl + '/AllContent/getAllContent' + ' And Header Is: ',
    headers,
  );
  return axios
    .post(globalConfigs.baseUrl + '/AllContent/getAllContent', headers)
    .then(res => {
      console.log('GetContentApi', res);
      return res;
    })
    .catch(error => {
      console.log(
        'parsing failed at app/api/ContentApi/ in GetContentApi() for Fetching User Interest Content',
        error,
      );
      NetInfo.fetch().then(state => {
        if (state.isConnected)
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
        else
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
      });
    });
};

export const GetDetailedContentApi = data => {
  console.log(
    'GetDetailedContentApi URL',
    globalConfigs.baseUrl + data + ' And Header Is: ',
    headers,
  );
  return axios
    .post(globalConfigs.baseUrl + data, headers)
    .then(res => {
      console.log('GetDetailedContentApi', res);
      return res;
    })
    .catch(error => {
      console.log(
        'parsing failed at app/api/ContentApi/ in GetDetailedContentApi() for Fetching Detailed Content',
        error,
      );
      NetInfo.fetch().then(state => {
        if (state.isConnected)
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
        else
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
      });
    });
};
