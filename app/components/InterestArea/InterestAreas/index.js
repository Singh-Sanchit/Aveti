import React, {Component} from 'react';
import { View} from 'react-native';
import InterestAreas from './InterestAreas';

export default class index extends Component {
  render() {
    return (
      <View>
        <InterestAreas navigation={this.props.navigation}/>
      </View>
    );
  }
}
