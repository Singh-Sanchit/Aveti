import React, {Component, Fragment} from 'react';
import {View, Image} from 'react-native';
import {Card, CardItem, Left, Body, Text, Icon, Right} from 'native-base';
import HTML from 'react-native-render-html';
import moment from 'moment';
import {WebView} from 'react-native-webview';

export default class Video extends Component {
  render () {
    return (
      <Card pointerEvents="none" style={{elevation: 8}}>
        {this.props.element.embedURL
          ? <View
              style={{
                padding: 10,
              }}
            >
              <CardItem
                style={{
                  height: 250,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  overflow: 'hidden',
                }}
                cardBody
              >
                <WebView
                  javaScriptEnabled
                  startInLoadingState={true}
                  automaticallyAdjustContentInsets={true}
                  source={{
                    uri: this.props.element.embedURL.includes ('iframe')
                      ? 'https:' +
                          this.props.element.embedURL.match (
                            /src="([^"]+)"/m
                          )[1]
                      : this.props.element.embedURL,
                  }}
                />
              </CardItem>
            </View>
          : null}
        <CardItem bordered={true}>
          <Body>
            {this.props.element.title
              ? <HTML
                  html={this.props.element.title}
                  baseFontStyle={{fontWeight: 'bold', fontSize: 16}}
                />
              : null}
            <View>
              {this.props.element.duration
                ? <Icon
                    type="FontAwesome"
                    android="hourglass-2"
                    ios="hourglass-2"
                    style={{fontSize: 14}}
                  >
                    <Text note> {this.props.element.duration}</Text>
                  </Icon>
                : null}
            </View>
          </Body>
        </CardItem>
        <CardItem bordered={true}>
          <Left>
            {this.props.element.creationDate
              ? this.props.element.embedURL.includes ('vimeo')
                  ? <Fragment>
                      <Image
                        style={{width: 16, height: 16}}
                        source={{uri: "https://seeklogo.net/wp-content/uploads/2014/06/vimeo-icon-vector.png"}}
                      />
                      <Text note style={{fontSize: 12}}>
                        {'Vimeo - ' +
                          moment (this.props.element.creationDate).fromNow ()}
                      </Text>
                    </Fragment>
                  : <Fragment>
                      <Image
                        style={{width: 16, height: 16}}
                        source={{uri: "https://pbs.twimg.com/profile_images/1148327441527689217/1QpS06D6_400x400.png"}}
                      />
                      <Text note style={{fontSize: 12}}>
                        {'YouTube - ' +
                          moment (this.props.element.creationDate).fromNow ()}
                      </Text>
                    </Fragment>
              : null}
          </Left>
          <Right>
            <Icon
              type="FontAwesome"
              android="bookmark"
              ios="bookmark"
              style={{
                fontSize: 11,
                textAlign: 'right',
                color: '#D81B60',
              }}
            >
              <Text style={{fontSize: 11, color: '#D81B60'}}>
                {' '}
                {this.props.contentType}
              </Text>
            </Icon>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
