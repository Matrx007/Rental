import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import Styles from '../Styles.jsx';
import References from '../References.jsx';



export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const styles = {
            
            textInput: {
                borderWidth: 1.5,
                borderColor: '#d8d8d8',
                width: 230,
                paddingHorizontal: 16,
                paddingVertical: 8,
                margin: 0,
                borderRadius: 8,
                fontSize: 18,
                fontWeight: '500',
                color: '#000'
            }
        };

        return (
            <TextInput
                placeholder={this.props.placeholder}
                style={styles.textInput}
                placeholderTextColor='#aaa'
                keyboardType={this.props.keyboardType}
            />
        );
    }
};

Feature.propTypes = { type: PropTypes.string.isRequired };