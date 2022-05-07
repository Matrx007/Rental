import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SimpleButton from '../components/SimpleButton.jsx';
import Styles from '../Styles.jsx';
import Global from '../Global.jsx';
import * as Firebase from '../Firebase.js';
import References from '../References.jsx';

class QuickFilterBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            header: {
                fontSize: 14,
                fontWeight: '700',
                color: '#000',
                textTransform: 'uppercase'
            },
            content: {
                color: '#000',
                fontSize: 18,
                fontWeight: '400'
            }
        };

        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[{width: 56, height: 56, justifyContent: 'center', backgroundColor: this.props.selected ? '#F4E3FD' : '#eee', borderRadius: 12}, this.props.style]}>
                    <Image style={{width: '100%', height: 24}} resizeMode={'contain'} source={References.features[this.props.type]}/>
                </View>
            </TouchableOpacity>
        );
    }
};

class Filter extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     minValue: '',
        //     maxValue: '',
        // };
    }

    render() {
        const styles = {
            header: {
                fontSize: 18,
                fontWeight: '700',
                color: '#000',
                marginBottom: 8
            },
            filter: {
                // borderLeftWidth: 2,
                // borderLeftColor: '#000',
                paddingLeft: 8,
                marginTop: 16
            },
            field: {
                fontSize: 18,
                color: '#000f',
                backgroundColor: '#f8f8f8',
                padding: 4
            },
            content: {
                color: '#000',
                fontSize: 18,
                fontWeight: '400'
            },
            row: {
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center'
            }
        };

        return (
            <View style={[styles.row, this.props.style]}>
                <View style={[styles.filter, {flex: 1}]}>
                    <Text style={styles.header}>{this.props.lang.features[this.props.type]}</Text>

                    <View style={[styles.row, { paddingHorizontal: 0, flexWrap: 'wrap' }]}>
                        <TextInput 
                            style={[styles.field, this.props.rangeStart.match(/[^0-9]/g) ? {color: '#f00'} : undefined]}
                            keyboardType='numeric'
                            value={this.props.rangeStart}
                            onChangeText={(text) => {
                                // this.setState({minValue: text});
                                this.props.onRangeStartChange(text);
                                // this.props.onValueChange(text, this.state.maxValue);
                            }}
                            maxLength={12}
                        />
                        <Text style={{...styles.header, marginHorizontal: 8}}>-</Text>
                        <TextInput
                            style={[styles.field, this.props.rangeEnd.match(/[^0-9]/g) ? {color: '#f00'} : undefined]}
                            keyboardType='numeric'
                            value={this.props.rangeEnd}
                            onChangeText={(text) => {
                                // this.setState({maxValue: text});
                                this.props.onRangeEndChange(text);
                                // this.props.onValueChange(this.state.minValue, text);
                            }}
                            maxLength={12}
                        />
                        <Text style={[styles.header, {marginLeft: 8}]}>{this.props.lang.units[this.props.type]}</Text>
                    </View>
                </View>
            </View>
        );
    }
};

async function saveSearch(search) {
    try {
        //await AsyncStorage.setItem('@searchHistory', '{}');
        //return;
        if(!search.quickFilters) return;

        let prevSearchHistory = await AsyncStorage.getItem('@searchHistory');
        console.log('search history:', prevSearchHistory);

        if(prevSearchHistory == null) await AsyncStorage.setItem('@searchHistory', '{}');

        // Check if given searchParams isn't already stored
        if(prevSearchHistory.includes(JSON.stringify(search))) return;

        // Don't exceed max length of 20 records 
        /* let prevSearchHistoryJSON = JSON.parse(prevSearchHistory);
        if(Object.keys(prevSearchHistoryJSON).length > 5) {
            let timestamps = Object.keys(prevSearchHistoryJSON);
            timestamps.sort((a, b) => parseInt(a) - parseInt(b));
            console.log('sorted history timestamps:', timestamps);
            timestamps = timestamps.splice(0, 5 - timestamps.length);
            console.log('sorted history timestamps (after):', timestamps);
        } */

        let data = {};
        data[''+Date.now()] = search;
        await AsyncStorage.mergeItem('@searchHistory', JSON.stringify(data));
    } catch(e) {
        console.log('err in saveSearch(search):', e);
    }
}

// This is a navigators's screen
const Search = ({ navigation, route }) => {
    const [ lang, setLang] = Global.useLang();
    const [ selectedFilters, setSelectedFilters ] = useState({});
    const [ selectedQuickFilters, setSelectedQuickFilters ] = useState({});

    async function startSearch() {
        let searchParams = {
            filters: Object.keys(filters)
                .reduce((o, category) => Object.assign(o, {[category]: Object.keys(selectedFilters).filter(selectedFilter => filters[category].includes(selectedFilter))}), {}),
            
            quickFilters: Object.keys(selectedQuickFilters)
                .filter(quickFilter => selectedQuickFilters[quickFilter].active)
                .reduce((o, quickFilter) => Object.assign(o, {[quickFilter]: {
                        rangeStart: selectedQuickFilters[quickFilter].rangeStart, 
                        rangeEnd: selectedQuickFilters[quickFilter].rangeEnd
                    }}), {})
        };

        saveSearch(searchParams);

        navigation.navigate('Search Results', {searchParams});
    }

    const filters = {
        type: ["apartment", "house", "shared"],
        condition: ["new", "renovated", "medium", "poor"],
        material: ["wood", "log", "panel", "modular"],
        included: ["refrigerator", "stove", "all"],
        has: [ "balcony", "balconyClosed", "terrace", "garage", "elevator", "basement", "storageRoom", "yard", "attic"],
    };
    const quickFilters = ["area", "rent", "bedrooms", "wcs", "floors"];
    
    const styles = {
        header: {
            color: '#000',
            fontSize: 14,
            fontWeight: '700',
            textTransform: 'uppercase'
        },
        content: {
            color: '#000',
            fontSize: 18,
            fontWeight: '400'
        },
        borderBottom: {
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
            paddingBottom: 16,
            marginBottom: 16
        },
        line: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        filter: {
            paddingVertical: 4,
            paddingHorizontal: 16,
            backgroundColor: '#eee',
            borderRadius: 12
        },
        filterActive: {
            backgroundColor: '#F4E3FD',
            color: '#9900ef'
        }
    };

    // If search parameters were passed in, use them
    useEffect(() => {
        if(!route.params || !route.params.searchParams) return;

        setSelectedQuickFilters(Object.keys(route.params.searchParams.quickFilters)
            .reduce((o, quickFilter) => 
                Object.assign(o, {[quickFilter]: {...route.params.searchParams.quickFilters[quickFilter], active: true}})
            , {})
        );

    }, []);
    
    return (
        <ScrollView style={[Styles.Styles.fillScreen, {backgroundColor: '#fff'}]} contentContainerStyle={{padding: 24, paddingBottom: 32}}>
            
            <SimpleButton 
                theme={Styles.Themes.buttonLightTheme} 
                style={{marginBottom: 16}}
                title={lang.search.search} 
                onPress={startSearch}
            />

            <Text style={[ Styles.Styles.pageTitle, {fontSize: 24} ]}>{lang.search.filters}</Text>
            <View style={{marginVertical: 16, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                { quickFilters.map(quickFilter => (
                    <QuickFilterBox 
                        key={quickFilter}
                        style={{marginRight: 16}} 
                        type={quickFilter} 
                        selected={selectedQuickFilters[quickFilter] && selectedQuickFilters[quickFilter].active}
                        onPress={() => {
                            let newSelectedQuickFilters = {...selectedQuickFilters};
                            // If filter isn't in selectedQuickFilters yet, add it
                            if(!newSelectedQuickFilters[quickFilter]) newSelectedQuickFilters[quickFilter] = {active: false};
                            // Toggle active status in selectedQuickFilters
                            newSelectedQuickFilters[quickFilter].active = !newSelectedQuickFilters[quickFilter].active;
                            
                            setSelectedQuickFilters(newSelectedQuickFilters);
                        }}
                    />
                )) }
            </View>
            { Object.keys(selectedQuickFilters).filter(selectedQuickFilter => selectedQuickFilters[selectedQuickFilter].active).map((selectedQuickFilter, i) => (
                <Filter 
                    key={selectedQuickFilter}
                    style={i == 0 ? undefined : { borderTopWidth: 1, borderTopColor: '#eee', marginTop: 16 }}
                    type={selectedQuickFilter} 
                    lang={lang} 
                    rangeStart={selectedQuickFilters[selectedQuickFilter].rangeStart || ''}
                    rangeEnd={selectedQuickFilters[selectedQuickFilter].rangeEnd || ''}
                    onRangeStartChange={(rangeStart) => {
                        let newSelectedQuickFilters = {...selectedQuickFilters};
                        newSelectedQuickFilters[selectedQuickFilter].rangeStart = rangeStart;
                        setSelectedQuickFilters(newSelectedQuickFilters);
                    }}
                    onRangeEndChange={(rangeEnd) => {
                        let newSelectedQuickFilters = {...selectedQuickFilters};
                        newSelectedQuickFilters[selectedQuickFilter].rangeEnd = rangeEnd;
                        setSelectedQuickFilters(newSelectedQuickFilters);
                    }}
                    /* onValueChange={(rangeStart, rangeEnd) => {
                        let newSelectedQuickFilters = {...selectedQuickFilters};
                        
                        // Update ranges in selectedQuickFilters
                        newSelectedQuickFilters[selectedQuickFilter].rangeStart = rangeStart;
                        newSelectedQuickFilters[selectedQuickFilter].rangeEnd = rangeEnd;
                        
                        setSelectedQuickFilters(newSelectedQuickFilters);
                    }} */
                />
            )) }

            { Object.keys(filters).map(option => (
                <View style={{marginTop: 16}} key={option}>
                    <Text style={[ Styles.Styles.pageTitle, {fontSize: 24} ]}>{lang.features[option]}</Text>
                    <View style={styles.line}>
                        { filters[option].map(feature => (
                            <TouchableOpacity 
                                key={feature}
                                style={{ marginRight: 8, marginBottom: 8 }}
                                onPress={() => {
                                    let newSelectedFilters = {...selectedFilters};
                                    newSelectedFilters[feature] = !(!!selectedFilters[feature]);
                                    setSelectedFilters(newSelectedFilters);
                                }}
                            >
                                <Text style={[ styles.filter, {fontSize: 18, fontWeight: '500', color:'#000'}, selectedFilters[feature] ? styles.filterActive : undefined ]}>
                                    {lang.featureValues[feature]}
                                </Text>
                            </TouchableOpacity>
                        )) }
                    </View>
                </View>
            )) }

        </ScrollView>
    );
}
export default Search;