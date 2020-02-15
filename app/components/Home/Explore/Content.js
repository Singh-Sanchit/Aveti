import React, {Component, Fragment} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Linking,
  Share,
  Dimensions,
  Alert,
} from 'react-native';
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';
import {Text, Icon, Button} from 'native-base';
import * as ContentsApi from '../../../api/ContentApi';
import {ScrollView} from 'react-native-gesture-handler';
import validate from '../../../api/CheckValidity';
import HTML from 'react-native-render-html';
import {Placeholder, PlaceholderLine, Fade} from 'rn-placeholder';
import VideoApp from '../../Video/Video';
import Ppt from '../../Documents/Ppt';
import {WebView} from 'react-native-webview';

export default class Content extends Component {
  static navigationOptions = ({navigation}) => {
    let contentType = '';
    console.log('Params', navigation.state.params);
    switch (navigation.state.params.contentType) {
      case 1:
        contentType = 'Blogs';
        break;
      case 2:
        contentType = 'Course';
        break;
      case 3:
        contentType = 'Job';
        break;
      case 4:
        contentType = 'Presentation';
        break;
      case 5:
        contentType = 'Video';
        break;
      case 6:
        contentType = 'Book';
        break;
      case 7:
        contentType = 'Event';
        break;
      case 8:
        contentType = 'QnA';
        break;
      case 9:
        contentType = 'Tweets';
        break;
    }
    return {
      title: contentType,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      gesturesEnabled: true,
      headerRight: (
        <Icon
          type="FontAwesome"
          android="share-alt"
          ios="share-alt"
          style={{fontSize: 26, marginRight: 10, color: 'white'}}
          onPress={() =>
            Share.share(
              {
                message:
                  'Aveti: Read this amazing post by ' +
                  navigation.state.params.message,
                url: navigation.state.params.message,
                title: navigation.state.params.title,
              },
              {
                // Android only:
                dialogTitle: 'Share This Post via Aveti',
                // iOS only:
                excludedActivityTypes: [
                  'com.apple.UIKit.activity.PostToTwitter',
                ],
              },
            )
          }
        />
      ),
    };
  };

  state = {
    element: '',
    isLoading: true,
  };

  componentDidMount() {
    let apiUrl = '';
    switch (this.props.navigation.getParam('contentType', -1)) {
      case 1:
        apiUrl = '/articles/getArticle?id=';
        break;
      case 2:
        apiUrl = '/course/getCourse?id=';
        break;
      case 3:
        apiUrl = '/jobs/getJob?id=';
        break;
      case 4:
        apiUrl = '/presentations/getPresentation?id=';
        break;
      case 5:
        apiUrl = '/videos/getVideo?id=';
        break;
      case 6:
        apiUrl = '/book/getBook?id=';
        break;
      case 7:
        apiUrl = '/events/getEvent?id=';
        break;
      case 8:
        apiUrl = '/qanda/getQandA?id=';
        break;
      case 9:
        apiUrl = '/tweet/getTweet?id=';
        break;
    }
    ContentsApi.GetDetailedContentApi(
      apiUrl + this.props.navigation.getParam('id', -1),
    )
      .then(res => {
        validity = validate(res);
        if (validity == 'valid') {
          if (res.data.contentType != 4)
            this.setState({element: res.data.contentDetail, isLoading: false});
          else this.setState({element: res.data, isLoading: false});
          switch (this.props.navigation.getParam('contentType', -1)) {
            case 1:
              this.props.navigation.setParams({message: this.state.element.url});
              this.props.navigation.setParams({
                title: this.state.element.shortDescription
              });
              break;
            case 3:
              this.props.navigation.setParams({message: this.state.element.url});
              this.props.navigation.setParams({
                title: this.state.element.title
              });
              break;
            case 4:
              this.props.navigation.setParams({message: this.state.element.url});
              this.props.navigation.setParams({
                title: this.state.element.title
              });
              break;
            case 5:
              this.props.navigation.setParams({message: this.state.element.embedURL.includes("iframe") ? "https:" + this.state.element.embedURL.match(/src="([^"]+)"/m)[1]: this.state.element.embedURL});
              this.props.navigation.setParams({
                title: this.state.element.title
              });
              break;
            case 7:
              this.props.navigation.setParams({message: this.state.element.url});
              this.props.navigation.setParams({
                title: this.state.element.name
              });
              break;
          }
        } else if (validity == 'session invalid')
          this.props.navigation.navigate('Logout');
      })
      .catch(error => {
        Alert.alert(
          'We came across an issue',
          'We are working to continously improve.',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('HomeStackNavigator');
              },
            },
          ],
          {cancelable: false},
        );
      });
  }

  render() {
    if (!this.state.isLoading)
      if (this.state.element.embedURL != undefined && !this.state.element.embedURL.includes("youtube"))
        if (this.state.element.contentType == 5)
          return <VideoApp url={this.state.element.embedURL.includes("iframe") ? "https:" + this.state.element.embedURL.match(/src="([^"]+)"/m)[1]: this.state.element.embedURL}></VideoApp>;
        else return <Ppt element={this.state.element}></Ppt>;
      else if (this.state.element)
        return (
          <View style={styles.container}>
            <ScrollView>
              {this.state.element.imageUrl ? (
                this.state.element.imageUrl.includes("youtube") ? null : 
                <WebView
                  style={{height: 300}}
                  automaticallyAdjustContentInsets={true}
                  javaScriptEnabled
                  startInLoadingState={true}
                  source={{
                    uri: this.state.element.imageUrl,
                  }}></WebView>
              ) : null}
              <View>
                {this.state.element.photo ? (
                  <Image
                    resizeMode="contain"
                    source={{uri: this.state.element.photo}}
                    style={styles.canvas}
                  />
                ) : null}
                {this.state.element.thumbNailURL ? (
                  <Image
                    resizeMode="contain"
                    source={{uri: this.state.element.thumbNailURL}}
                    style={styles.canvas}
                  />
                ) : null}
                {this.state.element.thumbnailURL ? (
                  <Image
                    source={{uri: 'http:' + this.state.element.thumbnailURL}}
                    style={styles.canvas}
                  />
                ) : null}
                {this.state.element.photoURL ? (
                  <Image
                    resizeMode="contain"
                    source={{uri: this.state.element.photoURL}}
                    style={styles.canvas}
                  />
                ) : null}
              </View>
              <View style={{fontWeight: 800}}>
                {this.state.element.title ? (
                  <Text>{this.state.element.title}</Text>
                ) : null}
                {this.state.element.shortDescription ? (
                  <Text>{this.state.element.shortDescription}</Text>
                ) : null}
                {this.state.element.name ? (
                  <Text>{this.state.element.name}</Text>
                ) : null}
              </View>
              <View style={styles.renderImage}>
                {this.state.element.description ? (
                  
                    <Fragment>
                      <Text style={{color: '#2196F3', marginTop: 20}}>
                        TOPIC DESCRIPTION{'\n'}
                      </Text>
                      <HTML
                        note
                        style={{marginTop: 5}}
                        html={this.state.element.description}
                        ignoredTags={[...IGNORED_TAGS, 'iframe']}
                        ignoredStyles={['display']}
                        imagesMaxWidth={Dimensions.get('window').width}
                        onLinkPress={(e, link) => {
                          Linking.canOpenURL(link).then(supported => {
                            if (supported && link) {
                              Linking.openURL(link);
                            }
                          });
                        }}
                      />
                    </Fragment>
                ) : null}
                {this.state.element.snippet ? (
                    <Fragment>
                      <Text style={{color: '#2196F3', marginTop: 20}}>
                        TOPIC DESCRIPTION{'\n'}
                      </Text>
                      <HTML
                        note
                        html={this.state.element.snippet}
                        ignoredTags={[...IGNORED_TAGS, 'iframe']}
                        ignoredStyles={['display']}
                        imagesMaxWidth={Dimensions.get('window').width}
                        onLinkPress={(e, link) => {
                          Linking.canOpenURL(link).then(supported => {
                            if (supported && link) {
                              Linking.openURL(link);
                            }
                          });
                        }}
                      />
                    </Fragment>
                ) : null}
                {this.state.element.details ? (
                    <Fragment>
                      <Text style={{color: '#2196F3', marginTop: 20}}>
                        TOPIC DESCRIPTION{'\n'}
                      </Text>
                      <HTML
                        note
                        style={{marginTop: 5}}
                        html={this.state.element.details}
                        ignoredTags={[...IGNORED_TAGS, 'iframe']}
                        ignoredStyles={['display']}
                        imagesMaxWidth={Dimensions.get('window').width}
                        onLinkPress={(e, link) => {
                          Linking.canOpenURL(link).then(supported => {
                            if (supported && link) {
                              Linking.openURL(link);
                            }
                          });
                        }}
                      />
                    </Fragment>
                ) : null}
              </View>
              <View>
                {this.state.element.company ? (
                  <Text note>{this.state.element.company}</Text>
                ) : null}
              </View>
              <View>
                {this.state.element.address ? (
                  <Text style={{color: '#2196F3', marginTop: 20, fontSize: 12}}>
                    ADDRESS{'\n'}
                    <Icon
                      type="FontAwesome"
                      android="address-book-o"
                      ios="address-book-o"
                      style={{fontSize: 14, marginTop: 10}}>
                      <Text note> {this.state.element.address}</Text>
                    </Icon>
                  </Text>
                ) : null}
                {this.state.element.location ? (
                  <Text style={{color: '#2196F3', marginTop: 20, fontSize: 12}}>
                    LOCATION{'\n'}
                    <Icon
                      type="FontAwesome"
                      android="map-marker"
                      ios="map-marker"
                      style={{fontSize: 14, marginTop: 10}}>
                      <Text note> {this.state.element.location}</Text>
                    </Icon>
                  </Text>
                ) : null}
                {this.state.element.city ||
                this.state.element.state ||
                this.state.element.country ? (
                  <Text style={{color: '#2196F3', marginTop: 20, fontSize: 12}}>
                    LOCATION{'\n'}
                    <Icon
                      type="FontAwesome"
                      android="map-marker"
                      ios="map-marker"
                      style={{fontSize: 14, marginTop: 10}}>
                      <Text note>
                        {' '}
                        {this.state.element.city}, {this.state.element.state}{' '}
                        {this.state.element.country}
                      </Text>
                    </Icon>
                  </Text>
                ) : null}
              </View>
              <View>
                {this.state.element.datePostedOn ? (
                  <Icon
                    type="FontAwesome"
                    android="calendar-check-o"
                    ios="calendar-check-o"
                    style={{fontSize: 14}}>
                    <Text note>
                      {' '}
                      Posted On:{this.state.element.datePostedOn}
                    </Text>
                  </Icon>
                ) : null}
                {this.state.element.creationDate ? (
                  <Icon
                    type="FontAwesome"
                    android="calendar-plus-o"
                    ios="calendar-plus-o"
                    style={{fontSize: 14}}>
                    <Text note>
                      {' '}
                      Created On: {this.state.element.creationDate}
                    </Text>
                  </Icon>
                ) : null}
                {this.state.element.dateCreatedOn ? (
                  <Icon
                    type="FontAwesome"
                    android="calendar-plus-o"
                    ios="calendar-plus-o"
                    style={{fontSize: 14}}>
                    <Text note>
                      {' '}
                      Created On: {this.state.element.dateCreatedOn}
                    </Text>
                  </Icon>
                ) : null}
                {this.state.element.startTime ? (
                  <Icon
                    type="FontAwesome"
                    android="calendar-plus-o"
                    ios="calendar-plus-o"
                    style={{fontSize: 14}}>
                    <Text note>
                      {' '}
                      Created On: {this.state.element.startTime}
                    </Text>
                  </Icon>
                ) : null}
              </View>
              <View>
                {this.state.element.viewCount &&
                this.state.element.likeCount &&
                this.state.element.dislikeCount ? (
                  <Text note>
                    <Icon
                      type="FontAwesome"
                      android="eye"
                      ios="eye"
                      style={{fontSize: 14}}>
                      {' '}
                      {this.state.element.viewCount}
                    </Icon>
                    {'  '}
                    <Icon
                      type="FontAwesome"
                      android="thumbs-o-up"
                      ios="thumbs-o-up"
                      style={{fontSize: 14}}>
                      {' '}
                      {this.state.element.likeCount}
                    </Icon>
                    {'  '}
                    <Icon
                      type="FontAwesome"
                      android="thumbs-o-down"
                      ios="thumbs-o-down"
                      style={{fontSize: 14}}>
                      {' '}
                      {this.state.element.dislikeCount}
                    </Icon>
                  </Text>
                ) : null}
              </View>
              <View>
                {this.state.element.numberOfViews !== undefined &&
                this.state.element.numberOfDownloads !== undefined &&
                this.state.element.numberOfComments !== undefined ? (
                  <Text note>
                    <Icon
                      type="FontAwesome"
                      android="eye"
                      ios="eye"
                      style={{fontSize: 14}}>
                      {' '}
                      {this.state.element.numberOfViews}
                    </Icon>
                    {'  '}
                    <Icon
                      type="FontAwesome"
                      android="download"
                      ios="download"
                      style={{fontSize: 14}}>
                      {' '}
                      {this.state.element.numberOfDownloads}
                    </Icon>
                    {'  '}
                    <Icon
                      type="FontAwesome"
                      android="comments"
                      ios="comments"
                      style={{fontSize: 14}}>
                      {' '}
                      {this.state.element.numberOfComments}
                    </Icon>
                  </Text>
                ) : null}
              </View>
              <View>
                {this.state.element.duration ? (
                  <Icon
                    type="FontAwesome"
                    android="hourglass-2"
                    ios="hourglass-2"
                    style={{fontSize: 14}}>
                    <Text note> {this.state.element.duration}</Text>
                  </Icon>
                ) : null}
              </View>
              <View>
                {this.state.element.url ? (
                  <Button
                    style={{
                      backgroundColor: '#9CCC65',
                      color: 'white',
                      marginTop: 20,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      Linking.canOpenURL(this.state.element.url).then(
                        supported => {
                          if (supported) {
                            Linking.openURL(this.state.element.url);
                          }
                        },
                      );
                    }}>
                    <Text>View Details</Text>
                  </Button>
                ) : null}
              </View>
            </ScrollView>
          </View>
        );
      else
        return (
          <View style={styles.container}>
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
        <Placeholder Animation={Fade}>
          <PlaceholderLine
            height={30}
            style={{
              marginLeft: 10,
              borderRadius: 1,
              marginBottom: 20,
              marginRight: 10,
              marginTop: 5,
            }}
          />
          <PlaceholderLine
            height={100}
            style={{marginLeft: 10, borderRadius: 1, marginRight: 10}}
          />
          <PlaceholderLine
            height={200}
            style={{marginLeft: 10, borderRadius: 1, marginRight: 10}}
          />
        </Placeholder>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  renderImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
