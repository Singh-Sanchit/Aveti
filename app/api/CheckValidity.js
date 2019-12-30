import {Alert} from 'react-native';

export default validate = response => {
  if (response.data.statusCode == '-1') {
    Alert.alert(
      'Session Expired',
      'Please Login Again In The App To Continue',
      [
        {
          text: 'OK',
          onPress: () => {
            return 'session invalid';
          },
        },
      ],
      {cancelable: false},
    );
    return 'session invalid';
  } else return 'valid';
};
