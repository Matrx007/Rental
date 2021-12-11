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
import { SwipeablePanel } from 'rn-swipeable-panel';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Styles from '../Styles.jsx';
import References from '../References.jsx';
import Global from '../Global.jsx';
import SimpleButton from '../components/SimpleButton.jsx';
import Link from '../components/Link.jsx';

const InfoComponent = ({route}) => {
    const [lang, setLang] = Global.useLang();

    const styles = {
        infoSection: {
            flexDirection: 'column',
            flexWrap: 'wrap',
            paddingBottom: 16,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
            marginBottom: 16
        },
        infoLine: {
            minWidth: '50%'
        }
    };
    
    return (
        <View>
                
            <ImageBackground style={{paddingTop: 256}} imageStyle={{height: 256}} source={{uri: route.params.images[0]}}>                
                <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
                    {/* <Image style={{height: 256}} source={{uri: route.params.images[0]}}/> */}

                    <View>
                        {/* <AutoHeightImage width={Dimensions.get('window').width} source={{uri: route.params.thumbnail}} /> */}

                        <Image resizeMode="stretch" fadeDuration={0} source={ titleBackgroundImage } style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, opacity: 1 }}></Image>
                        
                        <View style={{flex: 1, position: 'absolute', bottom: 24, left: 24}}>
                            <Text style={[ Styles.Styles.pageTitle, {fontWeight: '400', fontSize: 24, color:'#fff', fontWeight: '900'} ]}>{route.params.address}</Text>
                            <Text style={[ Styles.Styles.pageTitle, {fontSize: 18, fontWeight: '700', color:'#fff'} ]}>{route.params.rent} {lang.units.pricePerMonth}</Text>
                        </View>
                    </View>
                    
                    <View style={{padding: 24}}>
                        <View style={styles.infoSection}>
                            <Feature __lang={lang} type={"Kinnisvara"} textValue value={route.params.type} style={styles.infoLine} />
                            <Feature __lang={lang} type={"Hoone"} textValue value={route.params.material} style={styles.infoLine} />
                            <Feature __lang={lang} type={"Korrus"} value={route.params.floor} style={styles.infoLine} />
                            <Feature __lang={lang} type={"Korruseid hoones"} value={route.params.floorsTotal} style={styles.infoLine} />
                        </View>
                        
                        <View style={styles.infoSection}>
                            <Feature __lang={lang} type={"Pindala"} unit={"area"} value={route.params.area} style={styles.infoLine} />
                            <Feature __lang={lang} type={"Tube"} value={route.params.rooms} style={styles.infoLine} />
                            <Feature __lang={lang} type={"Magamistube"} value={route.params.bedrooms} style={styles.infoLine} />
                            <Feature __lang={lang} type={"Vannitube"} value={route.params.bathrooms} style={styles.infoLine} />
                        </View>
                        
                        <SimpleButton theme={Styles.Themes.buttonLightTheme} title={lang.property.browsePhotos} onPress={() => {}}/>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const DescriptionComponent = ({route}) => {
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
        }
    };

    return (
        <ScrollView style={{flex: 1, padding: 24, backgroundColor: '#fff'}}>
            { route.params.description.map((e) => {
                return (
                    <View style={{marginBottom: 24}} key={e.title}>
                        <Text style={styles.header}>{e.title}</Text>
                        <Text style={styles.content}>{e.text}</Text>
                    </View>
                )
            }) }
        </ScrollView>
    );
};



class Feature extends React.Component {
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

        const units = {
            area: 'm²',
            price: '€',
            rent: '€ / kuus'
        };

        return (
            <View style={[{marginBottom: 16}, this.props.style]}>
                <Text style={ styles.header }>{this.props.type}</Text>
                {
                    this.props.value ? (
                        Array.isArray(this.props.value.constructor) ? (
                            this.props.value.map(element => {
                                return (
                                    <Text style={ styles.content } key={element}>
                                        {
                                            this.props.textValue 
                                                ? (this.props.__lang.featureValues[element] || '-') 
                                                : element} {units[this.props.unit]
                                        }
                                    </Text>
                                );
                            })
                        ) : (
                            <Text style={ styles.content }>
                                {
                                    this.props.textValue
                                        ? (this.props.__lang.featureValues[this.props.value] || '-')
                                        : this.props.value} {units[this.props.unit]
                                }
                            </Text>
                        )
                    ) : (
                        <Text style={ styles.content }>-</Text>
                    )
                }
            </View>
        );
    }
};

class FeatureBox extends React.Component {
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

        const units = {
            area: 'm²',
            price: '€',
            rent: '€ / kuus'
        };

        return (
            <TouchableOpacity>
                <View style={[{width: 56, height: 56, justifyContent: 'center', backgroundColor: '#eee', borderRadius: 12}, this.props.style]}>
                    <Image style={{width: '100%', height: 24}} resizeMode={'contain'} source={References.features[this.props.type]}/>
                    <Text style={{color: '#000', fontWeight: '700', fontSize: 14, textAlign: 'center'}}>{this.props.value} {units[this.props.type]}</Text>
                </View>
            </TouchableOpacity>
        );
        {/* <View style={[{marginBottom: 16}, this.props.style]}>
            <Text style={ styles.header }>{this.props.type}</Text>
            {
                this.props.value ? (
                    Array.isArray(this.props.value.constructor) ? (
                        this.props.value.map(element => {
                            return (
                                <Text style={ styles.content } key={element}>
                                    {
                                        this.props.textValue 
                                            ? (this.props.__lang.featureValues[element] || '-') 
                                            : element} {units[this.props.unit]
                                    }
                                </Text>
                            );
                        })
                    ) : (
                        <Text style={ styles.content }>
                            {
                                this.props.textValue
                                    ? (this.props.__lang.featureValues[this.props.value] || '-')
                                    : this.props.value} {units[this.props.unit]
                            }
                        </Text>
                    )
                ) : (
                    <Text style={ styles.content }>-</Text>
                )
            }
        </View> */}
    }
};

const titleBackgroundImage = require('../../assets/waves.png');

// This is a navigator's screen
// Expected route.params: property data
export default ({ navigator, route }) => {
    // route.params = References.dev.example; 
    if(!route.params || !route.params.images || !route.params.images.length) {
        console.error('Property view: route.params is missing images[]');
        return null;
    }

    const [viewHeight, setViewHeight] = useState(0);
    const [viewWidth, setViewWidth] = useState(0);
    const [lang, setLang] = Global.useLang();
    const [headerHeight, setHeaderHeight] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);



    const imageData = route.params.images.map((e, i) => {return {id: i, data: e}});

    const styles = {
        infoSection: {
            flexDirection: 'column',
            flexWrap: 'wrap',
            paddingBottom: 16,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
            marginBottom: 16
        },
        separator: {
            paddingBottom: 16,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
            marginBottom: 16
        },
        infoLine: {
            minWidth: '50%'
        }
    };


    const renderPropertyPicture = ({ item }) => {
        return (
            // <ImageBackground resizeMode={'cover'} imageStyle={{opacity: 0.2}} style={{ backgroundColor: '#000', width: viewWidth, height: viewHeight }} source={{ uri: item.data }}>
            //     <Image resizeMode={'contain'} style={{ width: viewWidth, height: viewHeight }} source={{ uri: item.data }} />
            // </ImageBackground>
            <AutoHeightImage 
                width={Dimensions.get('window').width} source={{uri: item.data}} 

                onLayout={(e) => {
                    setImageHeight(e.nativeEvent.layout.height);
                }}
                />
        );
    };

    const Tab = createMaterialTopTabNavigator();
    

    return (
        <View style={[Styles.Styles.fillScreen, {flex: 1, backgroundColor: 'white'}]}
            
            onLayout={(e) => {
                setViewWidth(e.nativeEvent.layout.width);
                setViewHeight(e.nativeEvent.layout.height);
            }}
        >
            <Image style={{height: 256}} source={{uri: route.params.images[0]}}/>
            
            {/* <View>
                <Image resizeMode="stretch" fadeDuration={0} source={ titleBackgroundImage } style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, opacity: 1 }}></Image>
                
                <View style={{flex: 1, position: 'absolute', bottom: 24, left: 24}}>
                    <Text style={[ Styles.Styles.pageTitle, {fontWeight: '400', fontSize: 24, color:'#fff', fontWeight: '900'} ]}>{route.params.address}</Text>
                    <Text style={[ Styles.Styles.pageTitle, {fontSize: 18, fontWeight: '700', color:'#fff'} ]}>{route.params.rent} {lang.units.pricePerMonth}</Text>
                </View>
            </View> */}
            
            <ScrollView style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, flex: 1, backgroundColor: '#fff0'}}>

                <View style={{marginTop: 256, padding: 24, backgroundColor: '#fff'}}> 
                    <View style={[styles.separator]}>
                        <Text style={[ Styles.Styles.pageTitle, {fontWeight: '400', fontSize: 24, color:'#000', fontWeight: '900'} ]}>{route.params.address}</Text>
                        <Text style={[ Styles.Styles.pageTitle, {fontSize: 18, fontWeight: '700', color:'#000'} ]}>{route.params.rent} {lang.units.pricePerMonth}</Text>
                        <View style={{flexDirection: 'row', marginTop: 12}}>
                            <FeatureBox style={{marginRight: 8}} type={"area"} value={route.params.area}/>
                            <FeatureBox style={{marginRight: 8}} type={"bedrooms"} value={route.params.bedrooms}/>
                            <FeatureBox style={{marginRight: 8}} type={"bathrooms"} value={route.params.bathrooms}/>
                            <FeatureBox style={{marginRight: 8}} type={"floors"} value={route.params.floor}/>
                        </View>
                        <Text style={{color: '#000', marginTop: 12}}>
                            Tempor sunt dolore est sunt ex in ex amet occaecat in commodo dolore. Reprehenderit consequat culpa cupidatat veniam esse sit occaecat mollit nostrud enim qui. Duis irure veniam dolor nisi nulla. Nulla ex quis tempor consectetur ullamco.
                        </Text>
                        <Link style={{fontSize: 14}} title="Read more"/>
                    </View>
                
                    <View style={[styles.infoSection]}>
                        <Feature __lang={lang} type={"Kinnisvara"} textValue value={route.params.type} style={styles.infoLine} />
                        <Feature __lang={lang} type={"Hoone"} textValue value={route.params.material} style={styles.infoLine} />
                        <Feature __lang={lang} type={"Korrus"} value={route.params.floor} style={styles.infoLine} />
                        <Feature __lang={lang} type={"Korruseid hoones"} value={route.params.floorsTotal} style={styles.infoLine} />
                    </View>
                    
                    <View style={styles.infoSection}>
                        <Feature __lang={lang} type={"Pindala"} unit={"area"} value={route.params.area} style={styles.infoLine} />
                        <Feature __lang={lang} type={"Tube"} value={route.params.rooms} style={styles.infoLine} />
                        <Feature __lang={lang} type={"Magamistube"} value={route.params.bedrooms} style={styles.infoLine} />
                        <Feature __lang={lang} type={"Vannitube"} value={route.params.bathrooms} style={styles.infoLine} />
                    </View>
                    
                    <SimpleButton theme={Styles.Themes.buttonLightTheme} title={lang.property.browsePhotos} onPress={() => {}}/>
                </View>
            </ScrollView>
            
            
            {/* <Tab.Navigator 
                style={{width: viewWidth, height: viewHeight}} 
                initialRouteName="Description" 
                initialLayout={{ width: Dimensions.get('window').width }}
                tabBarPosition={'bottom'}

                tabBarStyle={{backgroundColor: '#000'}}
            >
                <Tab.Screen name="Info" component={InfoComponent} initialParams={route.params} options={{tabBarLabel: lang.property.info}}/>
                <Tab.Screen name="Description" component={DescriptionComponent} initialParams={route.params} options={{tabBarLabel: lang.property.description}}/>
            </Tab.Navigator> */}
        </View>
    );
}
