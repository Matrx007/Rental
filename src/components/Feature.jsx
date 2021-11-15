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

        const types = {
            area: {
                icon: References.features.area,
                unit: 'm²'
            },
            price: {
                icon: References.features.price,
                unit: '€'
            },
            bedrooms: {
                icon: References.features.bedrooms,
                unit: ''
            }
        };

        const type = types[this.props.type];

        return (
            <View style={[ styles.featuresRow ]}>
                <Image style={styles.featuresIcon} source={type.icon}/>
                <Text style={styles.featuresText}>{this.props.value} {type.unit}</Text>
            </View>
        );
    }
};

Feature.propTypes = { type: PropTypes.string.isRequired };