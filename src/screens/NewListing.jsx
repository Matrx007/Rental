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
  TextInput,
  Dimensions,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NumericInput from 'react-native-numeric-input';

import Styles from '../Styles.jsx';
import References from '../References.jsx';
import Global from '../Global.jsx';
import Options from '../components/Options.jsx';
import Multi from '../components/Multi.jsx';
import SimpleButton from '../components/SimpleButton.jsx';




// This is a navigator's screen
export default ({ navigation }) => {
    const [ scrollAmount, setScrollAmount ] = useState(0);
    const [ lang, setLang ] = Global.useLang();
    const [ propertyType, setPropertyType ] = useState("apartment");
    const [ pageXCoords, setPageXCoords ] = useState([]);
    const [ scrollViewRef, setScrollViewRef ] = useState();
    const [ details, setDetails ] = useState({});

    const PANE_WIDTH = Dimensions.get('window').width;

    const features = {
        oneTimePayment: {
            type: "custom",
            render: ({ data, setData }) => {
                return (
                    <>
                        <SimpleButton
                            style={{marginTop: 40}}
                            title={"{ ADD }"}
                            // TODO
                            // onPress={() => scrollViewRef.scrollToIndex({ animated: true, index: item.id + 1, viewPosition: 0 })}
                            onPress={() => {
                                if(!data) setData([""]);
                                else setData([...data, ""]);
                            }}
                        />

                        { data && data.map((value, index) => (
                            <TextInput 
                                style={{ borderRadius: 4, borderWidth: 1, borderColor: '#aaa', color: '#000', width: '90%', paddingHorizontal: 16, fontSize: 18 }}
                                value={value}
                                onChangeText={value => {
                                    let newArray = data;
                                    newArray[index] = value;
                                    setData(newArray);
                                }}
                            />
                        )) }
                    </>
                );
            }
        },
        address: {
            type: "text"
        },
        title: {
            type: "text"
        },
        description: {
            type: "text"
        },
        type: {
            type: "picker",
            options: [ "apartment", "house", "shared" ]
        },
        material: {
            type: "picker",
            options: [ "wood", "log", "panel", "modular" ]
        },
        condition: {
            type: "picker",
            options: [ "new", "renovated", "medium", "poor" ]
        },
        built: {
            type: "integer"
        },
        floor: {
            type: "integer"
        },
        floors: {
            type: "integer"
        },
        floorsTotal: {
            type: "integer"
        },
        area: {
            type: "float"
        },
        rooms: {
            type: "integer"
        },
        bedrooms: {
            type: "integer"
        },
        wcs: {
            type: "integer"
        },
        energyClass: {
            type: "picker",
            options: [ "A+", "A", "B+", "B", "C+", "C", "D+", "D", "E+", "E", "F+", "F", "G+", "G", "H+", "H" ]
        },
        included: {
            type: "multi",
            options: [ "refrigerator", "stove" ]
        },
        has: {
            type: "multi",
            options: [ "balcony", "balconyClosed", "terrace", "garage", "elevator", "basement", "storageRoom", "yard", "attic" ]
        },
        rent: {
            type: "float"
        },
        expenses: {
            type: "float"
        },
        expensesSummer: {
            type: "float"
        },
        expensesWinter: {
            type: "float"
        },
    };

    function updateDetails(feature, value) {
        setDetails({ ...details, [feature]: value });
    }

    function getDetails(feature) {
        return details[feature];
    }

    function checkDetails() {
        console.log("details:", details);

        const detailsKeys = Object.keys(details);
        const allFeaturesPresent = Object.keys(features).every(feature => {
            if(!features[feature].type == "text" && !features[feature].type == "picker") return true;
            return detailsKeys.includes(feature) && details[feature];
        });
        if(!allFeaturesPresent) {
            Alert.alert("Missing features");
        }
    }


    function renderFeaturePage({ item }) {
        return (
            <View vertical style={{width: Dimensions.get('window').width}}>
                <ScrollView 
                    vertical 
                    style={[ {flex: 1, height: '100%', padding: 16}]}
                    contentContainerStyle={{ display: 'flex', paddingVertical: 64, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={[ Styles.Styles.pageTitle, { color: '#000', marginBottom: 48 } ]}>{lang.features[item.data]}</Text>

                    { features[item.data].type == "picker" ? (
                        <Options
                            width={256}
                            height={48} 
                            maxHeight={256} 
                            onSelectedChange={(value) => updateDetails(item.data, value)}
                            options={
                                features[item.data].options.map(option => {return {id: option, label: lang.featureValues[option] || option}})
                            }
                        />
                    ) : null }

                    { features[item.data].type == "multi" ? (
                        <Multi
                            width={256}
                            height={48} 
                            maxHeight={256} 
                            onSelectedChange={(value) => updateDetails(item.data, value)}
                            options={
                                features[item.data].options.map(option => {return {id: option, label: lang.featureValues[option] || option}})
                            }
                        />
                    ) : null }

                    { features[item.data].type == "integer" ? (
                        <NumericInput
                            valueType='integer'
                            totalWidth={240}  
                            totalHeight={64}
                            value={getDetails(item.data)}
                            onChange={value => updateDetails(item.data, value || 0)}
                            iconStyle={{ color: 'black' }} 
                        />
                    ) : undefined }

                    { features[item.data].type == "float" ? (
                        <NumericInput
                            valueType='real'
                            minValue={0}
                            step={25}
                            totalWidth={240}  
                            totalHeight={64}
                            value={getDetails(item.data)}
                            onChange={value => updateDetails(item.data, value || 0)}
                            iconStyle={{ color: 'black' }} 
                        />
                    ) : undefined }

                    { features[item.data].type == "text" ? (
                        <TextInput 
                            style={{ borderRadius: 4, borderWidth: 1, borderColor: '#aaa', color: '#000', width: '90%', paddingHorizontal: 16, fontSize: 18 }}
                            value={getDetails(item.data)}
                            onChangeText={value => updateDetails(item.data, value || '')}
                        />
                    ) : undefined }

                    { features[item.data].type == "custom" ? 
                        features[item.data].render({
                            data: getDetails(item.data), 
                            setData: (value) => updateDetails(item.data, value)
                        })
                    : undefined }

                    { item.id != Object.keys(features).length-1 ? (
                        <SimpleButton
                            style={{marginTop: 40}}
                            title={lang.newListing.forward}
                            onPress={() => scrollViewRef.scrollToIndex({ animated: true, index: item.id + 1, viewPosition: 0 })}
                        />
                    ) : null }

                    { item.id == Object.keys(features).length-1 ? (
                        <SimpleButton
                            style={{marginTop: 40}}
                            title={lang.newListing.continue}
                            // TODO
                            // onPress={() => scrollViewRef.scrollToIndex({ animated: true, index: item.id + 1, viewPosition: 0 })}
                            onPress={checkDetails}
                        />
                    ) : null }

                    { item.id != 0 ? (
                        <SimpleButton
                            theme={ Styles.Themes.buttonLinkTheme }
                            style={{marginTop: 8}}
                            title={lang.newListing.backward}
                            onPress={() => scrollViewRef.scrollToIndex({ animated: true, index: item.id - 1, viewPosition: 0 })}
                        />
                    ) : null }

                </ScrollView>
            </View>
        );
    }

    return (
        <View style={[ Styles.Styles.fillScreen, { backgroundColor: '#fff' } ]}>
            <FlatList
                ref={(ref) => setScrollViewRef(ref)}

                style={{width: PANE_WIDTH}} 
                overScrollMode={'always'}
                scrollEnabled={false}
                horizontal 
                
                data={Object.keys(features).map((feature, i) => {return {data: feature, id: i}})}
                keyExtractor={item => item.id}
                renderItem={renderFeaturePage}
            />

            {/* <ScrollView 
                ref={(ref) => setScrollViewRef(ref)}
                overScrollMode={'always'}
                horizontal 
                style={{width: PANE_WIDTH}} 
                pagingEnabled={true}
                // snapToInterval={Dimensions.get('window').width}
                decelerationRate={0.99}
                // scrollEnabled={false}
            >
            </ScrollView> */}
                

                {/* <View vertical style={{width: Dimensions.get('window').width}}>

                    <View style={[ {flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center'}]}>
                        <Options
                            width={256}
                            height={48} 
                            options={[
                                {id: "apartment", label: lang.featureValues["apartment"]}, 
                                {id: "house", label: lang.featureValues["house"]}, 
                                {id: "shared", label: lang.featureValues["shared"]}
                            ]}
                        />
                        <SimpleButton
                            style={{marginTop: 40}}
                            title={lang.newListing["forward"]}
                            onPress={() => {}}
                        />
                    </View>
                
                </View>
                <View vertical style={{width: Dimensions.get('window').width}}>

                    <View style={[ {flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center'}]}>
                        <Options
                            width={256}
                            height={48} 
                            options={[
                                {id: "apartment", label: lang.featureValues["apartment"]}, 
                                {id: "house", label: lang.featureValues["house"]}, 
                                {id: "shared", label: lang.featureValues["shared"]}
                            ]}
                        />
                        <SimpleButton
                            style={{marginTop: 40}}
                            title={lang.newListing["forward"]}
                            onPress={() => scrollViewRef.scrollTo({x: 80, y: 0, animated: true})}
                        />
                    </View>
                
                </View> */}
        </View>
    );
}