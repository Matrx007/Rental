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
    let theme = this.props.theme ? this.props.theme : Styles.Themes.buttonTheme;
    return (
      <TouchableOpacity style={[ theme.box, this.props.style ]} onPress={this.props.onPress}> 
        <Text style={ theme.text }>{this.props.title}</Text>
      </TouchableOpacity> 
    );
  }
}

SimpleButton.propTypes = { title: PropTypes.string.isRequired, onPress: PropTypes.func.isRequired };