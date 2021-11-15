import React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { useState, useRef } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';

import Styles from '../Styles.jsx';
import References from '../References.jsx';

import Feature from '../components/Feature.jsx';


// This is a navigator's screen
// Expected route.params: property data
export default ({ navigator, route }) => {
    if(!route.params || !route.params.images || !route.params.images.length) {
        console.error('Property view: route.params is missing images[]');
        return null;
    }



    const [viewHeight, setViewHeight] = useState(32);
    const [viewWidth, setViewWidth] = useState(32);

    const renderPropertyPicture = ({ item }) => {
        return (
            <Image resizeMode={'contain'} style={{ width: viewWidth, height: viewHeight }} source={{ uri: item }} />
        );
        
    };

    return (
        <View   style={Styles.Styles.fillScreen}>
            <AutoHeightImage width={Dimensions.get('window').width} source={{uri: route.params.image}} />
            
            <View style={{padding: 24, backgroundColor: '#fff', borderTopWidth: 4, borderTopColor: '#0002'}}>

                <View style={{paddingBottom: 16, borderBottomColor: '#eee', borderBottomWidth: 1, marginBottom: 16}}>
                    <Text style={[ Styles.Styles.pageTitle, {fontWeight: '400', fontSize: 28, color:'#888'} ]}>{route.params.title}</Text>
                    <Text style={[ Styles.Styles.pageTitle, {fontSize: 21, fontWeight: '900'} ]}>{route.params.rent} € / month</Text>
                </View>
                
                <View style={{paddingBottom: 16, borderBottomColor: '#eee', borderBottomWidth: 1, marginBottom: 16}}>
                    <Feature type={"area"} value={route.params.property_size} />
                    <Feature type={"bedrooms"} value={route.params.bedrooms} />
                </View>
                
                <View style={{paddingBottom: 16, borderBottomColor: '#eee', borderBottomWidth: 1, marginBottom: 16}}>
                    <Text style={ Styles.Styles.navigationLink }>Browse photos</Text>
                </View>
                
                {/* <FlatList
                    vertical
                    style={[ Styles.Styles.fillScreen ]}
                    
                    data={route.params.images}
                    keyExtractor={(item, index) => index}
                    renderItem={renderPropertyPicture}

                    onLayout={(e) => {
                        setViewHeight(e.nativeEvent.layout.height); 
                        setViewWidth(e.nativeEvent.layout.width);
                    }}
                /> */}
            </View>
        </View>
    );
}