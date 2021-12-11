import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import { useState } from 'react';

import Styles from '../../Styles.jsx';
import Global from '../../Global.jsx';
import * as Firebase from '../../Firebase.js';
import ImageViewer from 'react-native-image-zoom-viewer';

// This is a navigation's screen
// Expected route.params: property images
const Gallery = ({ navigation, route }) => {
    const [viewHeight, setViewHeight] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [lang, setLang] = Global.useLang();
    
    if(!initialized) {
        navigation.setOptions({title: `${lang.property.gallery} 1/${route.params.length}`});
        setInitialized(true);
    }
    
    function signOut() {
        setLoading(true);  
        Firebase.signOut(() => setLoading(false));
    }
    
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
    
    const renderImage = ({ item }) => {
        return (
            <View style={[Styles.Styles.fillScreen, {backgroundColor: '#000', height: viewHeight}]}>
                <Image resizeMode="contain" source={{uri: item }} style={[Styles.Styles.fillScreen]}></Image>
            </View>
        );
    };
    
    return (
        <ImageViewer
            imageUrls={route.params}
            backgroundColor={'#eee'}
            enablePreload={true}
            saveToLocalByLongPress={false}
            renderIndicator={() => {}}
            flipThreshold={80}
            onChange={(index) => {
                console.log(lang.property);
                navigation.setOptions({title: `${lang.property.gallery} ${index+1}/${route.params.length}`});
            }}
        />
    );
    {/* <FlatList style={[ Styles.Styles.fillScreen ]} 
        vertical
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        data={route.params}
        
        keyExtractor={(item, index) => index}
        
        renderItem={renderImage}
        
        onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}
    /> */}
}
export default Gallery;