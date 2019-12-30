import React, {Component} from 'react';
import {Text, View, ImageBackground, StyleSheet, Button} from 'react-native';
import {SelectMultipleButton} from 'react-native-selectmultiple-button';
import * as InterestAreasApi from '../../../api/InterestAreaApi';
import _ from 'lodash';
import SInfo from 'react-native-sensitive-info';
import {ScrollView} from 'react-native-gesture-handler';
import validate from '../../../api/CheckValidity';
const ios_blue = '#007AFF';

export default class InterestAreas extends Component {
  state = {
    interestArea: [],
    multipleSelectedData: [],
    multipleSelectedDataLimited: [],
  };

  componentDidMount() {
    InterestAreasApi.GetAllInterestArea()
      .then(res => {
        validity = validate(res);
        if (validity == 'valid') {
          this.setState({interestArea: res.data});
        } else if (validity == 'session invalid')
          this.props.navigation.navigate('Logout');
      })
      .then(res => {
        SInfo.getItem('userStatus', {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        }).then(userStatus => {
          if (userStatus == 'exist') {
            InterestAreasApi.GetInterestAreaByUserId().then(res => {
              validity = validate(res);
              if (validity == 'valid') {
                let result = this.state.interestArea.filter(data =>
                  res.data.some(x => x.id == data.id),
                );
                if (result.length <= 2) {
                  this.setState({
                    multipleSelectedDataLimited: result.map(x => x.name),
                  });
                }
              } else if (validity == 'session invalid')
                this.props.navigation.navigate('Logout');
            });
          }
        });
      });
  }

  _singleTapMultipleSelectedButtons_limited(interest) {
    if (this.state.multipleSelectedDataLimited.includes(interest)) {
      _.remove(this.state.multipleSelectedDataLimited, ele => {
        return ele === interest;
      });
    } else {
      if (this.state.multipleSelectedDataLimited.length > 1)
        this.state.multipleSelectedDataLimited.pop();
      this.state.multipleSelectedDataLimited.push(interest);
    }
    this.setState({
      multipleSelectedDataLimited: this.state.multipleSelectedDataLimited,
    });
  }

  onSubmit = () => {
    let selectedId = [];
    this.state.multipleSelectedDataLimited.forEach(data => {
      selectedId.push(
        this.state.interestArea.filter(res => res.name == data)[0].id,
      );
    });
    InterestAreasApi.SetInterestArea(selectedId.join()).then(res => {
      if (res.status == 200) {
        SInfo.setItem('refresh', 'true', {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        });
        this.props.navigation.navigate('Home');
      } else Alert.alert('Please Choose Interest Area Appropriately');
    });
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={require('../../../assets/splash_screen_new.png')}
          style={{width: '100%', height: '100%'}}>
          <View>
            <Text style={styles.message}>
              Select any Two Areas of your Interest
            </Text>
          </View>
          <ScrollView>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {this.state.interestArea.map(interest => (
                <SelectMultipleButton
                  key={interest.id}
                  buttonViewStyle={{
                    borderRadius: 5,
                    height: 40,
                  }}
                  textStyle={{
                    fontSize: 15,
                  }}
                  highLightStyle={{
                    borderColor: 'white',
                    backgroundColor: 'white',
                    textColor: 'black',
                    borderTintColor: ios_blue,
                    backgroundTintColor: ios_blue,
                    textTintColor: 'white',
                  }}
                  value={interest.name}
                  selected={this.state.multipleSelectedDataLimited.includes(
                    interest.name,
                  )}
                  singleTap={valueTap =>
                    this._singleTapMultipleSelectedButtons_limited(
                      interest.name,
                    )
                  }
                />
              ))}
            </View>
          </ScrollView>
          <Button
            title="DONE"
            style={styles.bottomButton}
            onPress={this.onSubmit}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 14,
    color: 'white',
    padding: 10,
    fontWeight: '800',
  },
  bottomButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
});
