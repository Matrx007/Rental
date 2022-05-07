import React from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

import PropTypes from 'prop-types';
import Styles from '../Styles.jsx';
import References from '../References.jsx';



/*
    options: [{ label: <translated>, id: <untranslated> }]
*/
export default class Multi extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIDs: [],
            // selectedID: this.props.hasOwnProperty("initialIndex") ? this.props.options[this.props.initialIndex].id : null
        };
    }
    
    render() {
        const { selectedIDs } = this.state;

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

            const select = (id) => {
                console.log('before:', selectedIDs);
                console.log('includes', id, ':', selectedIDs.includes(id));
                if(selectedIDs.includes(id)) {
                    selectedIDs.splice(selectedIDs.indexOf(id), 1);
                    this.setState({selectedIDs: selectedIDs});
                    console.log('after:', selectedIDs);
                } else {
                    this.setState({selectedIDs: [...selectedIDs, id]});
                    console.log('after:', this.state.selectedIDs);
                }
                this.props.onSelectedChange(selectedIDs);
            };

            return (
                <TouchableWithoutFeedback onPress={() => select(option.id)} key={option.id}>
                    <Text style={selectedIDs.includes(option.id) ? selectedStyle : style}>{option.label}</Text>
                </TouchableWithoutFeedback>
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