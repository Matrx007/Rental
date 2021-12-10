import React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useState, useRef } from 'react';

import Styles from '../Styles.jsx';
import References from '../References.jsx';
import Global from '../Global.jsx';

import Feature from '../components/Feature.jsx';



const savedProperties = References.dev.testData.slice(0, 50).map((item, index) => {
    return {id: index, data: item};
});

const promotedProperties = References.dev.testData.slice(60, 90).map((item, index) => {
    return {id: index, data: item};
});

const searchHistory = [
    { rentMin: 740,     rentMax: 870,   bedroomsMin: 1,     bedroomsMax: 2 },
    { rentMin: 620,     rentMax: 690,   bedroomsMin: 2,     bedroomsMax: 3 },
    { rentMin: 1000,    rentMax: 1090,  bedroomsMin: 3,     bedroomsMax: 3 },
    { rentMin: 860,     rentMax: 860,   bedroomsMin: 1,     bedroomsMax: 1, sizeMin: 140, sizeMax: 170 },
    { rentMin: 820,     rentMax: 900,   bedroomsMin: 3,     bedroomsMax: 4, sizeMin: 120, sizeMax: 120 },
    { rentMin: 820,     rentMax: 820,   bedroomsMin: 2,     bedroomsMax: 3, sizeMin: 100, sizeMax: 130 },
].map((item, index) => {
    return {id: index, data: item};
});

const searchHistoryStyles = StyleSheet.create({
    featuresRow: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    featuresIcon: {
        width: 16,
        height: 16,
        marginRight: 12
    },
    featuresText: {
        ...Styles.Styles.pageSubTitle,
        fontSize: 18, 
        fontWeight: '700'
    }
});


// This is a navigator's screen
export default ({ navigation }) => {
    const [ scrollAmount, setScrollAmount ] = useState(0);
    const [lang, setLang] = Global.useLang();
    
    const renderProperty = ({ item }) => (
        <View>
            <TouchableOpacity 
                style={[ Styles.Styles.card, { overflow: 'visible', marginHorizontal: 8, maxWidth: 256, height: 'auto' } ]}
                onPress={() => navigation.push('Property', item.data)}>
                <Image source={{uri: item.data.image}} style={{width: '100%', height: 80, borderRadius: Styles.Styles.card.borderRadius}}/>
                <View style={{padding: 10, height: 'auto'}}>
                    <Text style={[ Styles.Styles.pageSubTitle, {height: 'auto', fontSize: 18, fontWeight: '900'} ]}>{item.data.rent} € / month</Text>
                    <Text style={[ Styles.Styles.pageSubTitle, {height: 'auto', fontSize: 18, fontWeight: '400', color: '#888'} ]}>{item.data.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    const renderLastSearch = ({ item }) => (
        <View>
            <TouchableOpacity 
                style={[ Styles.Styles.card, { overflow: 'visible', marginHorizontal: 8, padding: 8} ]}>
                {
                    item.data.rentMin ? (
                        <Feature 
                                small
                                type={"price"}
                                value={item.data.rentMin == item.data.rentMax ? item.data.rentMin : item.data.rentMin + ' - ' + item.data.rentMax} 
                                />
                    ) : null
                }
                {
                    item.data.bedroomsMin ? (
                        <Feature 
                                small
                                type={"bedrooms"}
                                value={item.data.bedroomsMin == item.data.bedroomsMax ? item.data.bedroomsMin : item.data.bedroomsMin + ' - ' + item.data.bedroomsMax} 
                                />
                    ) : null
                }
                {
                    item.data.sizeMin ? (
                        <Feature 
                                small
                                type={"area"}
                                value={item.data.sizeMin == item.data.sizeMax ? item.data.sizeMin : item.data.sizeMin + ' - ' + item.data.sizeMax} 
                                />
                    ) : null
                }
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground style={[ Styles.Styles.fillScreen, { backgroundColor: '#fff' } ]} imageStyle={{ height: 256 }} resizeMode="cover" source={References.graphics.wavesTop}>
            <ScrollView 
                style={[ Styles.Styles.fillScreen]}>



                <Text style={[ Styles.Styles.pageTitle, { margin: 32, fontSize: 48, marginBottom: 96, color: 'white', fontWeight: '900' } ]}>{lang.global.appName}</Text>

                <View style={{padding: 16}}>


                    <Text style={ Styles.Styles.pageTitle }>{lang.homeFeed.searchHistory}</Text>
                    <FlatList
                        removeClippedSubviews
                        showsHorizontalScrollIndicator={false}
                        style={{marginVertical: 16, overflow: 'visible'}}
                        horizontal

                        data={searchHistory}
                        keyExtractor={item => item.id}
                        renderItem={renderLastSearch}
                    />



                    <Text style={ Styles.Styles.pageTitle }>{lang.homeFeed.savedProperties}</Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{marginVertical: 16, overflow: 'visible'}}
                        horizontal

                        data={savedProperties}
                        keyExtractor={item => item.id}
                        renderItem={renderProperty}
                    />



                    <Text style={ Styles.Styles.pageTitle }>{lang.homeFeed.promoted}</Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{marginVertical: 16, overflow: 'visible'}}
                        horizontal

                        data={promotedProperties}
                        keyExtractor={item => item.id}
                        renderItem={renderProperty}
                    />


                    <Text style={[ Styles.Styles.pageTitle, {marginTop: 80} ]}>Test</Text>
                    <Text style={[ Styles.Styles.pageTitle, {marginTop: 80} ]}>Test</Text>
                    <Text style={[ Styles.Styles.pageTitle, {marginTop: 80} ]}>Test</Text>

                </View>
            </ScrollView>
        </ImageBackground>
    );
}