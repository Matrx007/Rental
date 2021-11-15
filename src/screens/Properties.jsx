import React from 'react';
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
  Text,
  View,
  Button,
  Dimensions,
  ImageBackground,
  Animated
} from 'react-native';
import { useState, useRef } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';


import Styles from '../Styles.jsx';

const titleBackgroundImage = require('../../assets/waves.png');

// This is a navigator's screen
export default (navigator) => {
  const [viewHeight, setViewHeight] = useState(32);

  const titleFadeAnim = useRef(new Animated.Value(1.0)).current;
  
  const titleFadeIn = () => {
    Animated.timing(titleFadeAnim, {
      toValue: 1.0,
      duration: 750,
      useNativeDriver: false
    }).start();
  };

  const titleFadeOut = () => {
    Animated.timing(titleFadeAnim, {
      toValue: 0.0,
      duration: 250,
      useNativeDriver: false
    }).start();
  };

  const hideInfo = () => {
    titleFadeOut();
  }

  const showInfo = () => {
    titleFadeIn();
  }

  let styles = {
    title: {
      position: 'absolute',
      left: 0,
      bottom: 0
    }
  };

  const imageData = [
    {src: require('../../assets/testing/img0.jpg'), title: 'Imedemaa, Kükametsa tn 178'},
    {src: require('../../assets/testing/img1.jpg'), title: 'Imedemaa, Kükametsa tn 151'},
    {src: require('../../assets/testing/img2.jpg'), title: 'Imedemaa, Kükametsa tn 117'},
    {src: require('../../assets/testing/img3.jpg'), title: 'Imedemaa, Kükametsa tn 157'},
    {src: require('../../assets/testing/img4.jpg'), title: 'Imedemaa, Kükametsa tn 108'}
  ];

  const renderProperty = ({ item }) => {
    return (
      <ImageBackground style={{width: '100%', height: viewHeight}} source={item.data.src}>
        <Animated.View style={[ styles.title, {opacity: titleFadeAnim} ]}>
          <Image resizeMode="cover" source={ titleBackgroundImage } style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}></Image>
          <Text style={[ Styles.Styles.pageTitle, { padding: 32, color: 'white' } ]}>
            {item.data.title}
          </Text>
        </Animated.View>
      </ImageBackground>
    );
  };
  
  return (
    <View 
    style={[ Styles.Styles.fillScreen ]}
    // contentContainerStyle={[ snippets.center ]}
    contentInsetAdjustmentBehavior="automatic">
      <StatusBar translucent={false} backgroundColor={'transparent'} />
      <FlatList style={[ Styles.Styles.fillScreen ]} 
        vertical
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        data={[
          { id: 0, /* title: '111', subtitle: '111111111'  */ data: imageData[0] },
          { id: 1, /* title: '222', subtitle: '222222222'  */ data: imageData[1] },
          { id: 2, /* title: '333', subtitle: '333333333'  */ data: imageData[2] },
          { id: 3, /* title: '444', subtitle: '444444444'  */ data: imageData[3] },
          { id: 4, /* title: '555', subtitle: '555555555'  */ data: imageData[4] }
        ]}
        
        keyExtractor={item => item.id}
        
        renderItem={renderProperty}
        // renderItem={({item}) => (<Button title={item.title}/>)}
        
        onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}

        onScrollBeginDrag={hideInfo}
        onScrollEndDrag={showInfo}
      />
    </View>
  );
}
