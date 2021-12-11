import React from 'react';
import {
  Text,
  TouchableOpacity,
  Pressable
} from 'react-native';

import Styles from '../Styles.jsx';
import PropTypes from 'prop-types';


export default class Link extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}> 
        <Text style={[{color: '#9900ef', fontWeight: '700', fontSize: 16}, this.props.style]}>{this.props.title}</Text>
      </TouchableOpacity> 
    );
  }
}

Link.propTypes = { title: PropTypes.string.isRequired, onPress: PropTypes.func.isRequired };