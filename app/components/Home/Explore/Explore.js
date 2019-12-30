import React, {Component, Fragment} from 'react';
import {Card, CardItem, Text, View, Container, Content} from 'native-base';
import {ScrollView, RefreshControl} from 'react-native';
import * as ContentsApi from '../../../api/ContentApi';
import {TouchableHighlight} from 'react-native-gesture-handler';
import validate from '../../../api/CheckValidity';
import SInfo from 'react-native-sensitive-info';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import firebase from 'react-native-firebase';
import {withNavigation} from 'react-navigation';
import News from '../../Cards/News';
import Jobs from '../../Cards/Jobs';
import Video from '../../Cards/Video';
import Presentation from '../../Cards/Presentation';
import Event from '../../Cards/Event';

class Explore extends Component {
  state = {
    content: null,
    refreshing: false,
    isLoading: true,
  };

  componentDidMount() {
    ContentsApi.GetContentApi().then(res => {
      validity = validate(res);
      if (validity == 'valid') {
        this.setState({content: res.data.content, isLoading: false});
      } else if (validity == 'session invalid')
        this.props.navigation.navigate('Logout');
    });
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      SInfo.getItem('refresh', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      }).then(value => {
        if (value == 'true') {
          this._onRefresh();
        }
      });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _onRefresh = () => {
    this.setState({refreshing: true, isLoading: true});
    ContentsApi.GetContentApi().then(res => {
      validity = validate(res);
      if (validity == 'valid') {
        SInfo.setItem('refresh', 'false', {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        });
        this.setState({
          content: res.data.content,
          refreshing: false,
          isLoading: false,
        });
      } else if (validity == 'session invalid')
        this.props.navigation.navigate('Logout');
    });
  };

  cardClicked = (id, contentType) => {
    this.props.navigation.navigate('ContentScreen', {
      id: id,
      contentType: contentType,
    });
  };

  render() {
    if (!this.state.isLoading)
      if (this.state.content)
        return (
          <ScrollView
            nestedScrollEnabled={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            {this.state.content.map((element, key) => {
              let contentType = '';
              switch (element.contentType) {
                case 1:
                  contentType = 'Blog';
                  return (
                      <TouchableHighlight
                        key={key}
                        style={{
                          padding: 5,
                        }}
                        onPress={() => {
                          SInfo.getAllItems({
                            sharedPreferencesName: 'mySharedPrefs',
                            keychainService: 'myKeychain',
                          }).then(values => {
                            firebase.analytics().logEvent('Details_Opened', {
                              name: values.name,
                              email: values.email,
                              contentType: 'Blog',
                              contentId: element.id,
                            });
                          });
                          this.cardClicked(element.id, element.contentType);
                        }}
                        underlayColor="white">
                        <News
                          element={element}
                          contentType={contentType}></News>
                      </TouchableHighlight>
                  );
                case 3:
                  contentType = 'Job';
                  return (
                    <TouchableHighlight
                      key={key}
                      style={{
                        padding: 5,
                      }}
                      onPress={() => {
                        SInfo.getAllItems({
                          sharedPreferencesName: 'mySharedPrefs',
                          keychainService: 'myKeychain',
                        }).then(values => {
                          firebase.analytics().logEvent('Details_Opened', {
                            name: values.name,
                            email: values.email,
                            contentType: 'Job',
                            contentId: element.id,
                          });
                        });
                        this.cardClicked(element.id, element.contentType);
                      }}
                      underlayColor="white">
                      <Jobs element={element} contentType={contentType}></Jobs>
                    </TouchableHighlight>
                  );
                case 4:
                  contentType = 'Presentation';
                  return (
                    <TouchableHighlight
                      key={key}
                      style={{
                        padding: 5,
                      }}
                      onPress={() => {
                        SInfo.getAllItems({
                          sharedPreferencesName: 'mySharedPrefs',
                          keychainService: 'myKeychain',
                        }).then(values => {
                          firebase.analytics().logEvent('Details_Opened', {
                            name: values.name,
                            email: values.email,
                            contentType: 'Presentation',
                            contentId: element.id,
                          });
                        });
                        this.cardClicked(element.id, element.contentType);
                      }}
                      underlayColor="white">
                      <Presentation
                        element={element}
                        contentType={contentType}></Presentation>
                    </TouchableHighlight>
                  );
                case 5:
                  contentType = 'Video';
                  return (
                    <TouchableHighlight
                      key={key}
                      style={{
                        padding: 5,
                      }}
                      onPress={() => {
                        SInfo.getAllItems({
                          sharedPreferencesName: 'mySharedPrefs',
                          keychainService: 'myKeychain',
                        }).then(values => {
                          firebase.analytics().logEvent('Details_Opened', {
                            name: values.name,
                            email: values.email,
                            contentType: 'Video',
                            contentId: element.id,
                          });
                        });
                        this.cardClicked(element.id, element.contentType);
                      }}
                      underlayColor="white">
                      <Video
                        element={element}
                        contentType={contentType}></Video>
                    </TouchableHighlight>
                  );
                case 7:
                  contentType = 'Event';
                  return (
                    <TouchableHighlight
                      key={key}
                      style={{
                        padding: 5,
                      }}
                      onPress={() => {
                        SInfo.getAllItems({
                          sharedPreferencesName: 'mySharedPrefs',
                          keychainService: 'myKeychain',
                        }).then(values => {
                          firebase.analytics().logEvent('Details_Opened', {
                            name: values.name,
                            email: values.email,
                            contentType: 'Event',
                            contentId: element.id,
                          });
                        });
                        this.cardClicked(element.id, element.contentType);
                      }}
                      underlayColor="white">
                      <Event
                        element={element}
                        contentType={contentType}></Event>
                    </TouchableHighlight>
                  );
              }
            })}
          </ScrollView>
        );
      else
        return (
          <View style={{flex: 1, padding: 10}}>
            <Text
              style={{
                fontSize: 24,
              }}>
              Sorry,{'\n'}
              Resource Not Found.
            </Text>
          </View>
        );
    else
      return (
        <Fragment>
          {[0, 1, 2, 3, 4].map(data => (
            <Card key={data}>
              <CardItem>
                <Placeholder
                  Animation={Fade}
                  Left={props => <PlaceholderMedia isRound={true} />}>
                  <PlaceholderLine
                    height={30}
                    style={{marginLeft: 10, borderRadius: 1, marginBottom: 5}}
                  />
                  <PlaceholderLine
                    height={50}
                    style={{marginLeft: 10, borderRadius: 1, marginBottom: -5}}
                  />
                </Placeholder>
              </CardItem>
            </Card>
          ))}
        </Fragment>
      );
  }
}

export default withNavigation(Explore);
