import React, {Component} from 'react';
import {View} from 'react-native';
import GoogleLogin from './GoogleLogin';

export default class index extends Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <View>
        <GoogleLogin navigation={this.props.navigation} />
      </View>
    );
  }
}
