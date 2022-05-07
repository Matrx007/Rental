import React from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
	FlatList,
	TouchableWithoutFeedback
} from 'react-native';
import { useState } from 'react';

import Styles from '../Styles.jsx';
import Global from '../Global.jsx';
import * as Firebase from '../Firebase.js';

import SimpleButton from '../components/SimpleButton.jsx';

// This is a navigators's screen
const Profile = ({ navigation }) => {
    const [ loading, setLoading ] = Global.useLoading();
    const [ lang, setLang ] = Global.useLang();
    const [ userData, setUserData ] = Global.useUserData();
    const [ properties, setProperties ] = Global.useProperties();
    
    function signOut() {
        setLoading(true);    
        Firebase.signOut(() => setLoading(false));
    }
    
    console.log('userData', userData);
    console.log('Firebase.Auth.currentUser', Firebase.Auth.currentUser);
    
    const renderProperty = ({ item }) => (
        <View style={{marginBottom: 32}}>
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
    
    return (userData && Firebase.Auth.currentUser) ? (
        <View style={[ Styles.Styles.fillScreen, { backgroundColor: '#fff' } ]}>
			<View style={{padding: 32}}>
				<Text style={{color: '#000', fontWeight: '500', fontSize: 24, marginBottom: 0}}>{lang.profile.greeting},</Text>
				<Text style={{color: '#000', fontWeight: '700', fontSize: 32, marginBottom: 0}}>{userData.firstname} {userData.lastname}</Text>
				<Text style={{color: '#aaa', fontWeight: '500', fontSize: 16, marginBottom: 24}}>{Firebase.Auth.currentUser?.email}</Text>
				<SimpleButton title={lang.profile.logOut} onPress={signOut}/>
            	<Text style={[Styles.Styles.pageTitle, {marginTop: 32, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 32}]}>{lang.profile.myProperties}</Text>
				<SimpleButton theme={Styles.Themes.buttonLightTheme} style={{marginTop: 16}} title={lang.profile.newListing} onPress={() => navigation.navigate('New Listing')}/>
			</View>

			<FlatList
			    contentContainerStyle={{paddingHorizontal: 32-8}}
				horizontal

				data={properties}
				keyExtractor={item => item.id}
				renderItem={renderProperty}
			/>
        </View>
    ) : (<></>);
}
export default Profile;