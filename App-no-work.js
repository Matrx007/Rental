import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Modal, FlatList, ScrollView } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



const images  = [
  { url: '', props: { source: './assets/testing/img0.jpg' } },
  { url: '', props: { source: './assets/testing/img1.jpg' } },
  { url: '', props: { source: './assets/testing/img2.jpg' } },
  { url: '', props: { source: './assets/testing/img3.jpg' } },
  { url: '', props: { source: './assets/testing/img4.jpg' } }
];

const imageData = [
    require('./assets/testing/img0.jpg'),
    require('./assets/testing/img1.jpg'),
    require('./assets/testing/img2.jpg'),
    require('./assets/testing/img3.jpg'),
    require('./assets/testing/img4.jpg')
];

const infoButtonImage = require('./assets/icons/info.png');

const icons = {
    'area': require('./assets/icons/area.png'),
    'bed': require('./assets/icons/bed.png'),
    'floors': require('./assets/icons/floors.png'),
    'info': require('./assets/icons/info.png'),
    'price': require('./assets/icons/price.png')
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    property: {
        width: '100%',
        height: '100%'
    },
    image: {
        width: '100%',
        height: '100vh'
    },
    view: {
        width: '100%',
        height: '100vh'
    },
    panel: {
        padding: '16px'
    },
    hud: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100vh'
    },
    infoButton: {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        
        width: '48px',
        height: '48px',
        borderRadius: '24px',
        backgroundColor: '#fff',
        
        justifyContent: 'center',
        alignContent: 'center',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    infoButtonImage: {
        width: '50%',
        height: '50%',
        margin: '25%'
    },
    infoPointIcon: {
        width: '24px',
        height: '24px'
    },
    infoPoint: {
        alignSelf: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        gap: '16px',
        alignItems: 'center',
        marginTop: '16px'
    },
    infoHeader: {
        alignSelf: 'center',
        fontFamily: 'OpenSans_400Regular',
        fontSize: 18,
        letterSpacing: 4.5
    },
    infoPrice: {
        alignSelf: 'center',
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
        letterSpacing: 2.5,
        fontWeight: '700',
        marginBottom: '8px'
    },
    infoPanel: {
        flex: 1,
        flexDirection: 'column',
        gap: '0px'
    },
    regularTitle: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 12,
        letterSpacing: 3
        
    },
    boldTitle: {
        fontFamily: 'OpenSans_300Thin',
        fontSize: 12,
        letterSpacing: 3
    }
});

export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            swipeablePanelActive: false,
            infoButtonActive: true,
            fontsLoaded: false
        };
    }
 
    componentDidMount = () => {
        this.openPanel();
    };
 
    openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };
 
    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
    };
    
    showInfoButton = () => {
        this.setState({ infoButtonActive: true });
        console.log('Show info button');
    };
    
    hideInfoButton = () => {
        this.setState({ infoButtonActive: false });
        console.log('Hide info button');
    };
    
    updateFontsLoadedState = () => {
        this.setState({ fontsLoaded: true });
    };
    
    onAsyncError = () => {
        console.log("Failed to run async functions");
    };
    
    render() {
        return (
            <View style={styles.container}>
                <GestureRecognizer
                    style={styles.view}
                    onSwipeRight={() => console.log("Swiped right")}
                    onSwipeLeft={() => console.log("Swiped left")}
                    onSwipeUp={this.openPanel}
                >
                    <FlatList style={styles.view} 
                        pagingEnabled={true}
                        data={[
                            { id: 0, src: imageData[0] },
                            { id: 1, src: imageData[1] },
                            { id: 2, src: imageData[2] },
                            { id: 3, src: imageData[3] },
                            { id: 4, src: imageData[4] }
                        ]}
                        
                        keyExtractor={item => item.id}
                        
                        renderItem={({item}) => (<Image style={styles.image} source={item.src}/>)}
                        
                        onMomentumScrollBegin={this.hideInfoButton}
                        onMomentumScrollEnd={this.showInfoButton}
                    />
                </GestureRecognizer>
                
                {
                    this.state.infoButtonActive &&
                    <TouchableOpacity
                        activeOpacity={.6}
                        style = {styles.infoButton}
                        onPress = {this.openPanel}
                    >
                        <Image style={styles.infoButtonImage} source={infoButtonImage}/>
                    </TouchableOpacity>
                }
                
                {
                    this.state.swipeablePanelActive &&
                    <View style={styles.hud}>
                        <SwipeablePanel
                            closeOnTouchOutside
                            fullWidth
                            isActive={this.state.swipeablePanelActive}
                            onClose={this.closePanel}
                            onPressCloseButton={this.closePanel}
                            style={styles.panel}
                        >
                            <View style={styles.infoPanel}>
                                <Text style={styles.infoHeader}>Vanalinn, Lai 37</Text>
                                <Text style={styles.infoPrice}>2500€ / kuu</Text>
                                <View style={[styles.infoPoint, styles.regularTitle]}>
                                    <Image style={styles.infoPointIcon} source={icons["price"]}/>
                                    <Text>700 €/kuus</Text>
                                </View>
                                <View style={[styles.infoPoint, styles.regularTitle]}>
                                    <Image style={styles.infoPointIcon} source={icons["area"]}/>
                                    <Text>97 m²</Text>
                                </View>
                                <View style={[styles.infoPoint, styles.regularTitle]}>
                                    <Image style={styles.infoPointIcon} source={icons["bed"]}/>
                                    <Text>3 magamistuba</Text>
                                </View>
                                <View style={[styles.infoPoint, styles.regularTitle]}>
                                    <Image style={styles.infoPointIcon} source={icons["floors"]}/>
                                    <Text>6/7 korrus</Text>
                                </View>
                            </View>
                        </SwipeablePanel>
                    </View>
                }
            </View>
        );
    }
}