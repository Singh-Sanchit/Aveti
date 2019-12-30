import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import SInfo from 'react-native-sensitive-info';

export default class Sidebar extends Component {
  state = {
    name: '',
    email: '',
    imageURL: '',
  };

  items = [
    {
      navOptionThumb: require('../../assets/ic_home.png'),
      navOptionName: 'Home',
      screenToNavigate: 'Home',
    },
    {
      navOptionThumb: require('../../assets/ic_interest_area.png'),
      navOptionName: 'Interest Area',
      screenToNavigate: 'InterestArea',
    },
    {
      navOptionThumb: require('../../assets/thumbs-up.png'),
      navOptionName: 'Feedback',
      screenToNavigate: 'Feedback',
    },
    {
      navOptionThumb: require('../../assets/ic_logout.png'),
      navOptionName: 'Logout',
      screenToNavigate: 'Logout',
    },
  ];

  componentDidMount() {
    SInfo.getAllItems({
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(values => {
      this.setState({
        name: values.name,
        email: values.email,
        imageURL: values.userPic,
      });
    });
  }

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style={styles.sideMenuUpperPic}>
          <Image
            style={{width: 80, height: 80, borderRadius: 40, margin: 10}}
            source={{
              uri: this.state.imageURL,
            }}
          />
          <Text style={styles.title}>{this.state.name}</Text>
          <Text style={styles.subheading}>{this.state.email}</Text>
        </View>
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={styles.sideMenuBottomOptions}>
          {this.items.map((item, key) => (
            <TouchableOpacity
              onPress={() => {
                global.currentScreenIndex = key;
                this.props.navigation.navigate(item.screenToNavigate);
              }}
              key={key}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor:
                    global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                }}>
                <View style={{marginRight: 10, marginLeft: 20}}>
                  <Image source={item.navOptionThumb} />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                  }}>
                  {item.navOptionName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
  },
  sideMenuUpperPic: {
    flex: 0.8,
    resizeMode: 'center',
    backgroundColor: '#506ecc',
    justifyContent: 'flex-end',
    alignContent: 'flex-start',
  },
  sideMenuBottomOptions: {
    flex: 2,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    paddingLeft: 20,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 20,
    paddingBottom: 5,
    paddingTop: 3,
    color: 'white',
  },
});
