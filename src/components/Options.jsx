import React from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import PropTypes from 'prop-types';
import Styles from '../Styles.jsx';
import References from '../References.jsx';



/*
    options: [{ label: <translated>, id: <untranslated> }]
*/
export default class Options extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedID: this.props.hasOwnProperty("initialIndex") ? this.props.options[this.props.initialIndex].id : null
        };
    }
    
    render() {
        const { selectedID } = this.state;

        const styles = {
            outer: {
                borderWidth: 2,
                borderColor: '#d8d8d8',
                borderRadius: 6,
                flexGrow: 0,
                // overflow: 'hidden',
                width: this.props.width,
                height: this.props.height*this.props.options.length
            }
        };

        const renderOption = (option) => {
            const style = {
                width: this.props.width,
                height: this.props.height,
                color: '#aaa',
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
                textAlignVertical: 'center',
            };
            
            const selectedStyle = {
                width: this.props.width,
                height: this.props.height,
                color: '#9900ef',
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: '#e8e8e880',
            };

            const select = () => {
                this.setState({selectedID: option.id});
                this.props.onSelectedChange(option.id);
            };

            return (
                <TouchableOpacity onPress={select} key={option.id}>
                    <Text style={selectedID == option.id ? selectedStyle : style}>{option.label}</Text>
                </TouchableOpacity>
            );
        };

        return (
            <View style={this.props.maxHeight ? { maxHeight: this.props.maxHeight } : undefined}>
                <ScrollView style={styles.outer}>
                    {
                        this.props.options.map(option => renderOption(option))
                    }
                </ScrollView>
            </View>
        );
    }
}

// List.propTypes = { type: PropTypes.string.isRequired };