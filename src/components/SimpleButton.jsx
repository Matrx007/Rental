import React from 'react';
import {
  Text,
  TouchableOpacity,
  Pressable
} from 'react-native';

import Styles from '../Styles.jsx';
import PropTypes from 'prop-types';


export default class SimpleButton extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <TouchableOpacity style={ Styles.Styles.button } onPress={this.props.onPress}> 
        <Text style={ Styles.Styles.buttonText }>{this.props.title}</Text>
      </TouchableOpacity> 
    );
  }
}

SimpleButton.propTypes = { title: PropTypes.string.isRequired, onPress: PropTypes.func.isRequired };