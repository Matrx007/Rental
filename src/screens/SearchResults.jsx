import React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useState, useRef, useEffect } from 'react';

import Styles from '../Styles.jsx';
import References from '../References.jsx';
import Global from '../Global.jsx';

import SimpleButton from '../components/SimpleButton.jsx';
import * as Firebase from '../Firebase.js';




// This is a navigator's screen
// Expected route.params: property[]
export default ({ navigation, route }) => {
    
    if(!route.params || !route.params.searchParams) {
        console.error('Property view: route.params is missing searchParams');
        return null;
    }

    const [ properties, setProperties ] = useState(null);
    const [ scrollAmount, setScrollAmount ] = useState(0);
    const [ lang, setLang ] = Global.useLang();

    useEffect(() => {
        async function searchProperties() {
            let data = await Firebase.searchProperties(route.params.searchParams);
            let properties = Object.keys(data).map(property => {
                return {id: property, data: data[property]}
            });
            console.log('useEffect searchProperties() properties:', properties);
            setProperties(properties);
        }

        searchProperties();
    }, []);
    
    const renderProperty = ({ item }) => (
        <View style={{marginBottom: 32}}>
            <TouchableWithoutFeedback 
                onPress={() => navigation.navigate('Property', item.data)}>
                <View style={[ Styles.Styles.card, { overflow: 'visible', marginHorizontal: 8, minWidth: 320, height: 'auto' } ]}>
                    <Image source={{uri: item.data.images[0]}} style={{width: '100%', height: 160, borderRadius: Styles.Styles.card.borderRadius}}/>
                    <View style={{padding: 10, height: 'auto'}}>
                        <Text style={[ Styles.Styles.pageSubTitle, {height: 'auto', fontSize: 18, fontWeight: '900'} ]}>{item.data.rent} € / month</Text>
                        <Text style={[ Styles.Styles.pageSubTitle, {height: 'auto', fontSize: 18, fontWeight: '400', color: '#888'} ]}>{item.data.address}</Text>
                    </View> 
                </View>
            </TouchableWithoutFeedback>
        </View>
    )

    return (
        <View style={[Styles.Styles.fillScreen, {backgroundColor: '#fff'}]}>
            {properties ? (
                properties.length ? (
                    <FlatList
                        contentContainerStyle={{padding: 32}}

                        data={properties}
                        keyExtractor={item => item.id}
                        renderItem={renderProperty}
                    />
                ) : (
                    <Text style={[Styles.Styles.pageTitle, {textAlign: 'center', marginTop: 32}]}>{lang.searchResults.noResults}</Text>
                )
            ) : (
                    <Text style={[Styles.Styles.pageTitle, {textAlign: 'center', marginTop: 32}]}>{lang.searchResults.loading}</Text>
            )}
        </View>
    );
}