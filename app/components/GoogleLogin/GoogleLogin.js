import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import SInfo from 'react-native-sensitive-info';
import * as AuthenticationApi from '../../api/AuthenticationApi';
import globalConfigs from '../../api/GlobalConfigs';
import firebase from 'react-native-firebase';

export default class GoogleLogin extends Component {
  async componentDidMount() {
    this._configureGoogleSignIn();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: globalConfigs.googleClientIdDebug, //Replace with your own client id
      offlineAccess: false,
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(userInfo => {
        console.log('Google Success Login:', userInfo);
        AuthenticationApi.LoginApi(userInfo)
          .then(res => {
            console.log('Azure Server', res.data);
            SInfo.setItem('userLoggedIn', 'true', {
              sharedPreferencesName: 'mySharedPrefs',
              keychainService: 'myKeychain',
            });
            SInfo.setItem('name', userInfo.user.name, {
              sharedPreferencesName: 'mySharedPrefs',
              keychainService: 'myKeychain',
            });
            SInfo.setItem('email', userInfo.user.email, {
              sharedPreferencesName: 'mySharedPrefs',
              keychainService: 'myKeychain',
            });
            SInfo.setItem('userPic', userInfo.user.photo, {
              sharedPreferencesName: 'mySharedPrefs',
              keychainService: 'myKeychain',
            });
            SInfo.setItem('userStatus', res.data, {
              sharedPreferencesName: 'mySharedPrefs',
              keychainService: 'myKeychain',
            });
            SInfo.setItem('refresh', 'true', {
              sharedPreferencesName: 'mySharedPrefs',
              keychainService: 'myKeychain',
            });
            firebase.analytics().logEvent('Google_Login', {
              name: userInfo.user.name,
              email: userInfo.user.email,
            });
            if (res.data == 'true') {
              this.props.navigation.navigate('InterestArea');
            } else {
              this.props.navigation.navigate('App');
            }
          })
          .catch(error => {
            firebase.analytics().logEvent('OAuth_Failed', {
              name: userInfo.user.name,
              email: userInfo.user.email,
              state: 'error in google login and while saving variable',
              error: error.toString(),
            });
            Alert.alert('Something went wrong', 'Please Report This To Us');
          });
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('You Have Cancelled The Login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('In Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play Services Not Available or Outdated');
      } else {
        console.log(error);
        firebase.analytics().logEvent('OAuth_Failed', {
          state: 'error in google login try catch block',
          error: error.toString(),
        });
        Alert.alert('Something went wrong', 'Please Report This To Us');
        this.setState({
          error,
        });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image source={require('../../assets/app_icon1.png')} />
        </View>
        <View style={styles.googlebutton}>
          <TouchableOpacity onPress={this._signIn}>
            <Image source={require('../../assets/goologin.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const y1 = Dimensions.get('window').height * 0.15;
const y2 = Dimensions.get('window').height * 0.2;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignItems: 'center',
    marginTop: y1,
  },
  googlebutton: {
    alignItems: 'center',
    marginTop: y2,
  },
});
