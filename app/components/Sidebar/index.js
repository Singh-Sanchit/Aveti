import React, { Component } from 'react'
import Sidebar from './Sidebar';

export default class index extends Component {
  render() {
    return (
      <Sidebar navigation={this.props.navigation}/>
    )
  }
}

