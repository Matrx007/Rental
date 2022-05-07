import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import Styles from '../Styles.jsx';
import References from '../References.jsx';



export default class Feature extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const styles = {
            featuresRow: {
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center'
            },
            featuresIcon: {
                width: this.props.small ? 16 :  24,
                height: this.props.small ? 16 :  24,
                marginRight: this.props.small ? 12 : 16
            },
            featuresText: {
                color: '#000',
                fontSize: 18, 
                fontWeight: '600'
            }
        };

        return (
            <View style={[ styles.featuresRow ]}>
                <Image style={styles.featuresIcon} source={References.features[this.props.type]}/>
                <Text style={styles.featuresText}>{this.props.value} {this.props.lang.units[this.props.type]}</Text>
            </View>
        );
    }
};

Feature.propTypes = { type: PropTypes.string.isRequired };