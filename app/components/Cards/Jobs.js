import React, {Component} from 'react';
import {Card, CardItem, Left, Body, Text, Icon, Right} from 'native-base';
import HTML from 'react-native-render-html';
import moment from 'moment';

export default class Jobs extends Component {
  render() {
    return (
      <Card pointerEvents="none" style={{elevation: 8}}>
        <CardItem bordered={true}>
          <Body>
            {this.props.element.title ? (
              <HTML
                html={this.props.element.title}
                baseFontStyle={{fontWeight: 'bold', fontSize: 16}}
              />
            ) : null}
            {this.props.element.company ? (
              <Text note>{this.props.element.company}</Text>
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
        </CardItem>
        <CardItem bordered={true}>
          <Left>
            {this.props.element.datePostedOn ? (
              <Icon
                type="FontAwesome"
                android="calendar-check-o"
                ios="calendar-check-o"
                style={{fontSize: 14}}>
                <Text note>
                  {' '}
                  {moment(this.props.element.datePostedOn).fromNow()}
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
