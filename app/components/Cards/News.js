import React, {Component, Fragment} from 'react';
import {Dimensions, View, Image} from 'react-native';
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';
import {Card, CardItem, Left, Body, Text, Icon, Right} from 'native-base';
import HTML from 'react-native-render-html';
import moment from 'moment';
import {WebView} from 'react-native-webview';

export default class News extends Component {
  render() {
    let dynamicProps = [];
    {
      this.props.element.imageUrl
        ? this.props.element.imageUrl.includes('youtube')
          ? null
          : (dynamicProps['pointerEvents'] = 'none')
        : null;
    }
    return (
      <Card pointerEvents="none" style={{elevation: 8}}>
        {this.props.element.imageUrl ? (
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
              cardBody
              {...dynamicProps}>
              <WebView
                automaticallyAdjustContentInsets={true}
                javaScriptEnabled
                startInLoadingState={true}
                source={{
                  uri: this.props.element.imageUrl,
                }}></WebView>
            </CardItem>
          </View>
        ) : null}
        <CardItem bordered={true}>
          <Body>
            {this.props.element.shortDescription ? (
              <HTML
                html={this.props.element.shortDescription}
                baseFontStyle={{fontWeight: 'bold', fontSize: 16}}
              />
            ) : null}
            {this.props.element.details ? (
              <HTML
                note
                baseFontStyle={{color: 'grey'}}
                ignoredTags={[...IGNORED_TAGS, 'br']}
                html={
                  this.props.element.details.substring(0, 250) + '....'
                }
              />
            ) : null}
          </Body>
        </CardItem>
        <CardItem bordered={true}>
          <Left>
            {this.props.element.date ? (
              <Fragment>
                <Image
                  style={{width: 16, height: 16}}
                  source={{uri: this.props.element.logoURL}}
                />
                <Text note style={{fontSize: 12}}>
                  {this.props.element.author +
                    ' - ' +
                    moment(this.props.element.date).fromNow()}
                </Text>
              </Fragment>
            ) : null}
          </Left>
          <Right>
            <Icon
              type="FontAwesome"
              android="bookmark"
              ios="bookmark"
              style={{
                fontSize: 11,
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
