import React from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity
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
                overflow: 'hidden',
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
                color: '#000',
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: '#e8e8e8',
            };

            const select = () => {
                console.log("works");
                this.setState({selectedID: option.id})
            };

            console.log("seelcted:", this.state.selectedID);
            return (
                <TouchableOpacity onPress={select} key={option.id}>
                    <Text style={selectedID == option.id ? selectedStyle : style}>{option.label}</Text>
                </TouchableOpacity>
            );
        };

        return (
            <View style={styles.outer}>
                {
                    this.props.options.map(option => renderOption(option))
                }
            </View>
        );
    }
}

// List.propTypes = { type: PropTypes.string.isRequired };