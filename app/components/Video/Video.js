import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

export default class VideoApp extends Component {
  render() {
    // return <WebView source={{uri: this.props.url}}></WebView>;
    return <WebView 
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    source={{uri: this.props.url.includes("embed/") ? this.props.url.replace("embed/", "watch?v=") : this.props.url}}></WebView>;
  }
}
