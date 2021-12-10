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
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Styles from '../Styles.jsx';
import References from '../References.jsx';
import Global from '../Global.jsx';
import Options from '../components/Options.jsx';
import SimpleButton from '../components/SimpleButton.jsx';



// This is a navigator's screen
export default ({ navigation }) => {
    const [ scrollAmount, setScrollAmount ] = useState(0);
    const [lang, setLang] = Global.useLang();
    const [ propertyType, setPropertyType ] = useState("apartment");

    return (
        <ImageBackground style={[ Styles.Styles.fillScreen ]} imageStyle={{ height: 256 }} resizeMode="cover" source={References.graphics.wavesTop}>
            <Text style={[ Styles.Styles.pageTitle, { position: 'absolute', top: 32, left: 32, fontSize: 36, color: 'white', fontWeight: '900'} ]}>New listing</Text>
            
            <ScrollView 
                horizontal 
                style={{width: Dimensions.get('window').width}} 
                pagingEnabled={true}
                // snapToInterval={Dimensions.get('window').width}
                decelerationRate={0.99}
                // scrollEnabled={false}
            >
                <View vertical style={{width: Dimensions.get('window').width}}>

                    <View style={[ {flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center'}]}>
                        <Text style={ Styles.Styles.pageTitle }>New listing</Text>
                        <View
                            style={{
                                borderWidth: 1.5,
                                borderColor: '#d8d8d8',
                                borderRadius: 6,
                            }}
                        >
                            <Picker
                                mode={"dropdown"}
                                dropdownIconColor={'#000'}
                                style={{
                                    width: 256,
                                    color: '#000',
                                }}
                                selectedValue={propertyType}
                                onValueChange={(itemValue, itemIndex) => setPropertyType(itemValue)}
                            >
                                <Picker.Item label={lang.featureValues["apartment"]} value="apartment" />
                                <Picker.Item label={lang.featureValues["house"]} value="house" />
                                <Picker.Item label={lang.featureValues["shared"]} value="shared" />
                            </Picker>
                        </View>
                    </View>
                
                </View>
                <View vertical style={{width: Dimensions.get('window').width}}>

                    <View style={[ {flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center'}]}>
                        <Text style={ Styles.Styles.pageTitle }>New listing</Text>
                        <TextInput
                            placeholder="Rent"
                            style={Styles.Styles.listingField}
                            placeholderTextColor='#aaa'
                            keyboardType={'numeric'}
                        />
                    </View>
                
                </View>
                <View vertical style={{width: Dimensions.get('window').width}}>

                    <View style={[ {flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center'}]}>
                        <Text style={[Styles.Styles.pageTitle, {marginBottom: 40}]}>{lang.newListing["thisIs"]}</Text>
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
            </ScrollView>
        </ImageBackground>
    );
}