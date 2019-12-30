import React, {Component} from 'react';
import {View} from 'react-native';
import {Card, CardItem, Left, Body, Text, Icon, Right} from 'native-base';
import HTML from 'react-native-render-html';
import moment from 'moment';
import {WebView} from 'react-native-webview';

export default class Presentation extends Component {
  render() {
    return (
      <Card pointerEvents="none" style={{elevation: 8}}>
        <View
          style={{
            padding: 10,
          }}>
          <CardItem
            style={{
              height: 250,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              overflow: 'hidden',
            }}
            cardBody>
            {this.props.element.url ? (
              <WebView
                bounces={true}
                javaScriptEnabled
                startInLoadingState={true}
                source={{
                  uri: this.props.element.url,
                }}></WebView>
            ) : null}
          </CardItem>
        </View>
        <CardItem bordered={true}>
          <Body>
            {this.props.element.title ? (
              <HTML
                html={this.props.element.title}
                baseFontStyle={{fontWeight: 'bold', fontSize: 16}}
              />
            ) : null}
          </Body>
        </CardItem>
        <CardItem bordered={true}>
          <Left>
            {this.props.element.dateCreatedOn ? (
              <Icon
                type="FontAwesome"
                android="calendar-plus-o"
                ios="calendar-plus-o"
                style={{fontSize: 14}}>
                <Text note>
                  {' '}
                  {moment(this.props.element.dateCreatedOn).fromNow()}
                </Text>
              </Icon>
            ) : null}
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
              }}>
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
