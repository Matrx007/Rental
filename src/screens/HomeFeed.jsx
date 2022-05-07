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
import AsyncStorage from '@react-native-async-storage/async-storage';

import Styles from '../Styles.jsx';
import References from '../References.jsx';
import Global from '../Global.jsx';

import Feature from '../components/Feature.jsx';
import SimpleButton from '../components/SimpleButton.jsx';
import * as Firebase from '../Firebase.js';


const savedProperties = References.dev.testData.slice(0, 50).map((item, index) => {
    return {id: index, data: item};
});

const promotedProperties = References.dev.testData.slice(60, 90).map((item, index) => {
    return {id: index, data: item};
});

/* const searchHistory = [
    { rentMin: 740,     rentMax: 870,   bedroomsMin: 1,     bedroomsMax: 2 },
    { rentMin: 620,     rentMax: 690,   bedroomsMin: 2,     bedroomsMax: 3 },
    { rentMin: 1000,    rentMax: 1090,  bedroomsMin: 3,     bedroomsMax: 3 },
    { rentMin: 860,     rentMax: 860,   bedroomsMin: 1,     bedroomsMax: 1, sizeMin: 140, sizeMax: 170 },
    { rentMin: 820,     rentMax: 900,   bedroomsMin: 3,     bedroomsMax: 4, sizeMin: 120, sizeMax: 120 },
    { rentMin: 820,     rentMax: 820,   bedroomsMin: 2,     bedroomsMax: 3, sizeMin: 100, sizeMax: 130 },
].map((item, index) => {
    return {id: index, data: item};
}); */

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
    const [ lang, setLang ] = Global.useLang();
    const [ properties, setProperties ] = Global.useProperties();
    const [ savedProperties, setSavedProperties ] = useState(null);
    const [ searchHistory, setSearchHistory ] = useState({});

    useEffect(() => {
        let vals = Object.values(properties);
        let newSavedProperties = vals;
        //console.log('newSavedProperties', newSavedProperties);
        newSavedProperties[0] = vals[1];
        newSavedProperties[1] = vals[2];
        newSavedProperties[2] = vals[0];
        // newSavedProperties.sort((a, b) => Math.random() < .5 ? 1 : -1);
        setSavedProperties(newSavedProperties);
    }, [properties]);

    if(properties == null) {
        Firebase.getRandomProperties((docs) => {
            let properties = [];
            docs.forEach((doc) => {
                // properties[doc.id] = doc.data();
                let data = doc.data();
                
                data.lessor = data.lessor.path;
                
                properties.push({id: doc.id, data: data});
            });
            setProperties(properties);
            //console.log(properties);
        });
    }
    
    const renderProperty = ({ item }) => (
        <View>
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

    const renderLastSearch = ({ item }) => (
        <View>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Search', {searchParams: item.data})}
                style={[ Styles.Styles.card, { overflow: 'visible', marginHorizontal: 8, padding: 8} ]}
            >
                {
                    Object.keys(item.data.quickFilters).map(quickFilter => quickFilter && (
                        <Feature 
                            lang={lang}
                            small
                            type={quickFilter}
                            value={item.data.quickFilters[quickFilter].rangeStart == item.data.quickFilters[quickFilter].rangeEnd ? item.data.quickFilters[quickFilter].rangeStart : (item.data.quickFilters[quickFilter].rangeStart || '0') + (item.data.quickFilters[quickFilter].rangeEnd ? (' - ' + item.data.quickFilters[quickFilter].rangeEnd) : '+')} 
                        />
                    ))
                }
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        async function getSearchHistory() {
            let data = JSON.parse(await AsyncStorage.getItem('@searchHistory'));
            let history = Object.keys(data).map(key => {
                return {id: key, data: data[key]}
            });
            console.log('history:', JSON.stringify(history));
            setSearchHistory(history);
        }

        getSearchHistory();
    }, []);

    return (
        <ImageBackground style={[ Styles.Styles.fillScreen, { backgroundColor: '#fff' } ]} imageStyle={{ height: 256 }} resizeMode="cover" source={References.graphics.wavesTop}>
            <ScrollView 
                style={[ Styles.Styles.fillScreen]}>



                <Text style={[ Styles.Styles.pageTitle, { margin: 32, fontSize: 48, marginBottom: 96, color: 'white', fontWeight: '900' } ]}>{lang.global.appName}</Text>
                {/* <SimpleButton style={{ position: 'absolute', top: 48, right: 32 }} title={"My profile"}/> */}
                
                {
                    Firebase.Auth.currentUser?.isAnonymous ? (
                        <TouchableOpacity style={{ position: 'absolute', top: 48, right: 32 }} onPress={() => Firebase.signOut()}>
                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>{lang.homeFeed.logIn}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ position: 'absolute', top: 48, right: 32 }} onPress={() => navigation.navigate('Profile')}>
                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>{lang.homeFeed.myProfile}</Text>
                        </TouchableOpacity>
                    )
                }


                <View style={{padding: 16}}>
                    <Text style={ Styles.Styles.pageTitle }>{lang.homeFeed.search}</Text>
                    <View style={{marginBottom: 16}}>
                        <SimpleButton 
                            theme={Styles.Themes.buttonLightTheme} 
                            style={{marginHorizontal: 8, marginVertical: 16}}
                            title={lang.homeFeed.startSearch} 
                            onPress={() => navigation.navigate('Search')}
                        />
                        <FlatList
                            removeClippedSubviews
                            showsHorizontalScrollIndicator={false}
                            style={{overflow: 'visible'}}
                            horizontal

                            data={searchHistory}
                            keyExtractor={item => item.id}
                            renderItem={renderLastSearch}
                        />
                    </View>



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

                        data={Object.values(properties)}
                        keyExtractor={item => item.id}
                        renderItem={renderProperty}
                    />

                </View>
            </ScrollView>
        </ImageBackground>
    );
}