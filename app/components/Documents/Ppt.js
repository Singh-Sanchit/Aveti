import React, {Component, Fragment} from 'react';
import {WebView} from 'react-native-webview';
import {View, Image, StyleSheet, Linking, Dimensions} from 'react-native';
import {Text, Icon, Button} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';

export default class Ppt extends Component {
  render() {
    return (
      <Fragment>
        <WebView
          scalesPageToFit={true}
          bounces={true}
          javaScriptEnabled
          automaticallyAdjustContentInsets={true}
          source={{
            uri: this.props.element.url,
          }}></WebView>
        <View style={styles.container}>
          <ScrollView>
            <View>
              {this.props.element.photo ? (
                <Image
                  resizeMode="contain"
                  source={{uri: this.props.element.photo}}
                  style={styles.canvas}
                />
              ) : null}
              {this.props.element.thumbNailURL ? (
                <Image
                  resizeMode="contain"
                  source={{uri: this.props.element.thumbNailURL}}
                  style={styles.canvas}
                />
              ) : null}
              {this.props.element.thumbnailURL ? (
                <Image
                  source={{uri: 'http:' + this.props.element.thumbnailURL}}
                  style={styles.canvas}
                />
              ) : null}
              {this.props.element.photoURL ? (
                <Image
                  resizeMode="contain"
                  source={{uri: this.props.element.photoURL}}
                  style={styles.canvas}
                />
              ) : null}
            </View>
            <View style={{fontWeight: 800}}>
              {this.props.element.title ? (
                <Text>{this.props.element.title}</Text>
              ) : null}
              {this.props.element.shortDescription ? (
                <Text>{this.props.element.shortDescription}</Text>
              ) : null}
              {this.props.element.name ? (
                <Text>{this.props.element.name}</Text>
              ) : null}
            </View>
            <View>
              {this.props.element.description ? (
                <Fragment>
                  <Text style={{color: '#2196F3', marginTop: 20}}>
                    TOPIC DESCRIPTION{'\n'}
                  </Text>
                  <HTML
                    note
                    style={{marginTop: 5}}
                    html={this.props.element.description}
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
              {this.props.element.snippet ? (
                <Fragment>
                  <Text style={{color: '#2196F3', marginTop: 20}}>
                    TOPIC DESCRIPTION{'\n'}
                  </Text>
                  <HTML
                    note
                    html={this.props.element.snippet}
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
              {this.props.element.details ? (
                <Fragment>
                  <Text style={{color: '#2196F3', marginTop: 20}}>
                    TOPIC DESCRIPTION{'\n'}
                  </Text>
                  <HTML
                    note
                    style={{marginTop: 5}}
                    html={this.props.element.details}
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
              {this.props.element.company ? (
                <Text note>{this.props.element.company}</Text>
              ) : null}
            </View>
            <View>
              {this.props.element.address ? (
                <Text style={{color: '#2196F3', marginTop: 20, fontSize: 12}}>
                  ADDRESS{'\n'}
                  <Icon
                    type="FontAwesome"
                    android="address-book-o"
                    ios="address-book-o"
                    style={{fontSize: 14, marginTop: 10}}>
                    <Text note> {this.props.element.address}</Text>
                  </Icon>
                </Text>
              ) : null}
              {this.props.element.location ? (
                <Text style={{color: '#2196F3', marginTop: 20, fontSize: 12}}>
                  LOCATION{'\n'}
                  <Icon
                    type="FontAwesome"
                    android="map-marker"
                    ios="map-marker"
                    style={{fontSize: 14, marginTop: 10}}>
                    <Text note> {this.props.element.location}</Text>
                  </Icon>
                </Text>
              ) : null}
              {this.props.element.city ||
              this.props.element.state ||
              this.props.element.country ? (
                <Text style={{color: '#2196F3', marginTop: 20, fontSize: 12}}>
                  LOCATION{'\n'}
                  <Icon
                    type="FontAwesome"
                    android="map-marker"
                    ios="map-marker"
                    style={{fontSize: 14, marginTop: 10}}>
                    <Text note>
                      {' '}
                      {this.props.element.city}, {this.props.element.state}{' '}
                      {this.props.element.country}
                    </Text>
                  </Icon>
                </Text>
              ) : null}
            </View>
            <View>
              {this.props.element.datePostedOn ? (
                <Icon
                  type="FontAwesome"
                  android="calendar-check-o"
                  ios="calendar-check-o"
                  style={{fontSize: 14}}>
                  <Text note> Posted On:{this.props.element.datePostedOn}</Text>
                </Icon>
              ) : null}
              {this.props.element.creationDate ? (
                <Icon
                  type="FontAwesome"
                  android="calendar-plus-o"
                  ios="calendar-plus-o"
                  style={{fontSize: 14}}>
                  <Text note>
                    {' '}
                    Created On: {this.props.element.creationDate}
                  </Text>
                </Icon>
              ) : null}
              {this.props.element.dateCreatedOn ? (
                <Icon
                  type="FontAwesome"
                  android="calendar-plus-o"
                  ios="calendar-plus-o"
                  style={{fontSize: 14}}>
                  <Text note>
                    {' '}
                    Created On: {this.props.element.dateCreatedOn}
                  </Text>
                </Icon>
              ) : null}
              {this.props.element.startTime ? (
                <Icon
                  type="FontAwesome"
                  android="calendar-plus-o"
                  ios="calendar-plus-o"
                  style={{fontSize: 14}}>
                  <Text note> Created On: {this.props.element.startTime}</Text>
                </Icon>
              ) : null}
            </View>
            <View>
              {this.props.element.viewCount &&
              this.props.element.likeCount &&
              this.props.element.dislikeCount ? (
                <Text note>
                  <Icon
                    type="FontAwesome"
                    android="eye"
                    ios="eye"
                    style={{fontSize: 14}}>
                    {' '}
                    {this.props.element.viewCount}
                  </Icon>
                  {'  '}
                  <Icon
                    type="FontAwesome"
                    android="thumbs-o-up"
                    ios="thumbs-o-up"
                    style={{fontSize: 14}}>
                    {' '}
                    {this.props.element.likeCount}
                  </Icon>
                  {'  '}
                  <Icon
                    type="FontAwesome"
                    android="thumbs-o-down"
                    ios="thumbs-o-down"
                    style={{fontSize: 14}}>
                    {' '}
                    {this.props.element.dislikeCount}
                  </Icon>
                </Text>
              ) : null}
            </View>
            <View>
              {this.props.element.numberOfViews !== undefined &&
              this.props.element.numberOfDownloads !== undefined &&
              this.props.element.numberOfComments !== undefined ? (
                <Text note>
                  <Icon
                    type="FontAwesome"
                    android="eye"
                    ios="eye"
                    style={{fontSize: 14}}>
                    {' '}
                    {this.props.element.numberOfViews}
                  </Icon>
                  {'  '}
                  <Icon
                    type="FontAwesome"
                    android="download"
                    ios="download"
                    style={{fontSize: 14}}>
                    {' '}
                    {this.props.element.numberOfDownloads}
                  </Icon>
                  {'  '}
                  <Icon
                    type="FontAwesome"
                    android="comments"
                    ios="comments"
                    style={{fontSize: 14}}>
                    {' '}
                    {this.props.element.numberOfComments}
                  </Icon>
                </Text>
              ) : null}
            </View>
            <View>
              {this.props.element.duration ? (
                <Icon
                  type="FontAwesome"
                  android="hourglass-2"
                  ios="hourglass-2"
                  style={{fontSize: 14}}>
                  <Text note> {this.props.element.duration}</Text>
                </Icon>
              ) : null}
            </View>
            <View>
              {this.props.element.url ? (
                <Button
                  style={{
                    backgroundColor: '#9CCC65',
                    color: 'white',
                    marginTop: 20,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    Linking.canOpenURL(this.props.element.url).then(
                      supported => {
                        if (supported) {
                          Linking.openURL(this.props.element.url);
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
      </Fragment>
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
});
