import axios from 'axios';
import globalConfigs from './GlobalConfigs';
import SInfo from 'react-native-sensitive-info';
import {Alert} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

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

export const GetAllInterestArea = data => {
  console.log(
    globalConfigs.baseUrl +
      '/configuration/getInterestAreas' +
      ' And Header Is: ',
    headers,
  );
  return axios
    .post(globalConfigs.baseUrl + '/configuration/getInterestAreas', headers)
    .then(res => {
      console.log('GetAllInterestArea', res);
      return res;
    })
    .catch(error => {
      console.log(
        'parsing failed at app/api/ContentApi/ in GetAllInterestArea() for Fetching Interest Area',
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

export const GetInterestAreaByUserId = data => {
  console.log(
    globalConfigs.baseUrl +
      '/UserConfiguration/getUserInterestAreas' +
      ' And Header Is: ',
    headers,
  );
  return axios
    .post(
      globalConfigs.baseUrl + '/UserConfiguration/getUserInterestAreas',
      headers,
    )
    .then(res => {
      console.log('GetInterestAreaByUserId', res);
      return res;
    })
    .catch(error => {
      console.log(
        'parsing failed at app/api/ContentApi/ in GetInterestAreaByUserId() for Fetching Interest Area That User has Selected',
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

export const SetInterestArea = data => {
  console.log(
    'SetInterestAreaURL',
    globalConfigs.baseUrl +
      '/UserConfiguration/setUserInterestAreas?interestareaids=' +
      data +
      ' And Header Is: ',
    headers,
  );
  return axios
    .post(
      globalConfigs.baseUrl +
        '/UserConfiguration/setUserInterestAreas?interestareaids=' +
        data,
      headers,
    )
    .then(res => {
      console.log('SetInterestAreaApi', res);
      return res;
    })
    .catch(error => {
      console.log(
        'parsing failed at app/api/ContentApi/ in SetInterestArea() for Setting Interest Area That User has Selected',
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
