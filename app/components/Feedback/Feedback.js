import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import email from 'react-native-email';
import {
  Container,
  Content,
  Text,
  Icon,
  Card,
  CardItem,
  Item,
  Body,
  Right,
  Button,
  Form,
  Textarea,
  Left,
} from 'native-base';

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
    };
  }

  postMsg = msg => {
    if (this.state.msg != null) {
      this.setState({isSubmited: true});
      email('aveti123@gmail.com', {
        subject: 'Aveti App Feedback',
        body: msg,
      }).catch(console.error);
    } else {
      Alert.alert(
        'Oops !',
        'Press SUBMIT button after entering your Message.',
        [
          {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  _togglePostCard() {
    this.setState({
      isSubmited: false,
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Card style={styles.postCard}>
            {this.state.isSubmited ? (
              <View>
                <CardItem>
                  <Item>
                    <Icon
                      active
                      name="ios-checkmark-circle"
                      style={{
                        fontSize: 30,
                        color: '#4CAF50',
                        marginLeft: 5,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{flex: 1}}>
                      Thanks. We will get in touch with you as soon as possible
                    </Text>
                  </Item>
                </CardItem>
                <CardItem>
                  <Left></Left>
                  <Body>
                    <TouchableOpacity
                      success
                      onPress={() => this._togglePostCard()}>
                      <Icon
                        active
                        name="refresh"
                        style={{fontSize: 40, color: '#64DD17', marginLeft: 10}}
                      />
                    </TouchableOpacity>
                  </Body>
                  <Right></Right>
                </CardItem>
              </View>
            ) : (
              <View>
                <Form style={{marginLeft: 10, marginRight: 10}}>
                  <Textarea
                    rowSpan={5}
                    bordered
                    placeholder="Type your message"
                    onChangeText={msg => this.setState({msg})}
                    ref={'msgClear'}
                  />
                </Form>
                <CardItem>
                  <Left></Left>
                  <Body>
                    <Button
                      success
                      onPress={() => this.postMsg(this.state.msg, 'msgClear')}>
                      <Text>SUBMIT</Text>
                    </Button>
                  </Body>
                  <Right></Right>
                </CardItem>
              </View>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: '#1C97F7',
  },
  alertText: {
    fontSize: 12,
    color: '#ffffff',
  },
  conCard: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
  },
  conCardItem: {
    marginLeft: 5,
    marginTop: 5,
  },
  conDetails: {
    fontSize: 15,
    color: 'black',
    marginLeft: 5,
  },
  postCard: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    marginBottom: 20,
  },
});
