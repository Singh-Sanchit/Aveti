import React, {Component} from 'react';
import {
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Icon,
  Right,
} from 'native-base';
import HTML from 'react-native-render-html';
import moment from 'moment';

export default class Event extends Component {
  render() {
    return (
      <Card pointerEvents="none" style={{elevation: 8}}>
        <CardItem bordered={true}>
          <Left>
            {this.props.element.photoURL ? (
              <Thumbnail
                source={{uri: this.props.element.photoURL}}
                style={{
                  width: 85,
                  height: 70,
                  borderRadius: 7,
                  marginRight: 3,
                }}
              />
            ) : null}
            <Body>
              {this.props.element.name ? (
                <HTML
                  html={this.props.element.name}
                  baseFontStyle={{fontWeight: 'bold', fontSize: 16}}
                />
              ) : null}
              {this.props.element.city || this.props.element.country ? (
                <Icon
                  type="FontAwesome"
                  android="map-marker"
                  ios="map-marker"
                  style={{fontSize: 14}}>
                  <Text note>
                    {' '}
                    {this.props.element.city}, {this.props.element.country}
                  </Text>
                </Icon>
              ) : null}
            </Body>
          </Left>
        </CardItem>
        <CardItem bordered={true}>
          <Left>
            {this.props.element.startTime ? (
              <Icon
                type="FontAwesome"
                android="calendar-plus-o"
                ios="calendar-plus-o"
                style={{fontSize: 14}}>
                <Text note> Start On:  {moment(this.props.element.startTime).fromNow()}</Text>
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
