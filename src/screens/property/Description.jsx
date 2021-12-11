import React from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { useState } from 'react';

import Styles from '../../Styles.jsx';
import Global from '../../Global.jsx';
import * as Firebase from '../../Firebase.js';

// This is a navigators's screen
// Expected route.params: property descriptions
const Description = ({ navigator, route }) => {
    const [loading, setLoading] = Global.useLoading();
    
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
    
    return (
        <ScrollView style={[Styles.Styles.fillScreen, {backgroundColor: '#fff'}]} contentContainerStyle={{padding: 24, paddingBottom: 0}}>
            { route.params.map((e) => {
                return (
                    <View style={{marginBottom: 24}} key={e.title}>
                        <Text style={styles.header}>{e.title}</Text>
                        <Text style={styles.content}>{e.text}</Text>
                    </View>
                )
            }) }
        </ScrollView>
    );
}
export default Description;