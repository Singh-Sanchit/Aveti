import React, {Component} from 'react';
import {View} from 'react-native';
import Explore from './Explore';
import firebase from 'react-native-firebase';
import SInfo from 'react-native-sensitive-info';

export default class index extends Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  getToken() {
    SInfo.getItem('fcmToken', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(async fcmToken => {
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log('fcmToken:', fcmToken);
          SInfo.setItem('fcmToken', fcmToken, {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain',
          });
        }
      }  
      console.log('fcmToken:', fcmToken);
    });
   
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        console.log('onNotification:');

        const localNotification = new firebase.notifications.Notification({
          show_in_foreground: true,
        })
          .setNotificationId(notification.notificationId)
          .setTitle(title)
          .setBody(body)
          .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
          .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
          .android.setColor('#000000') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_FirebaseNotifiction_default_channel',
      'Aveti',
      firebase.notifications.Android.Importance.High,
    )
      .setDescription('Discover. Learn. Grow.')
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        console.log('onNotificationOpened:');
        // Alert.alert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      console.log('getInitialNotification:');
      // Alert.alert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log('JSON.stringify:', JSON.stringify(message));
    });
  }

  render() {
    return (
      <View>
        <Explore navigation={this.props.navigation} />
      </View>
    );
  }
}
