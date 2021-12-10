import React from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { useState } from 'react';

import Styles from '../Styles.jsx';
import Global from '../Global.jsx';
import * as Firebase from '../Firebase.js';

import SimpleButton from '../components/SimpleButton.jsx';


// This is a navigators's screen
const LogIn = ({ navigation }) => {
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [user, setUser] = Global.useUser();
  const [lang, setLang] = Global.useLang();
  const [loading, setLoading] = Global.useLoading();
  
  function logIn() {
    // TODO: firebase.login(callback: navigation.replace(..))
    navigation.replace('Properties');
  }
  
  function skipLogIn() {
    // TODO: firebase.asAnonymous(callback: navigation.replace(..))
    setLoading(true);  
    Firebase.skipLogIn(() => setLoading(false));
  }
  
  const rootViewStyle = {
    
  };

  return (
    <View style={[ Styles.Styles.fillScreen, { backgroundColor: '#0000' } ]}>
      
      <View style={ Styles.Styles.oneThirdSection }>
        <Text style={ Styles.Styles.pageTitle }>{lang.logIn.title}</Text>
        <Text style={ Styles.Styles.pageSubTitle }>{lang.logIn.subtitle}</Text>
      </View>
      
      <View style={[ Styles.Styles.oneThirdSection, {  paddingHorizontal: 32 } ]}>
        <View style={[ Styles.Styles.combinedSection, { marginBottom: 8 } ]}>
          <Text style={ Styles.Styles.combinedSectionHeader }>{lang.logIn.emailField}</Text>
          <TextInput
            placeholder="Aa"
            onChangeText={(loginEmail) => setLoginEmail(loginEmail)}
            value={loginEmail}
            style={Styles.Styles.inputBox}
            placeholderTextColor='#0008'
            />
        </View>
        
        <View style={Styles.Styles.combinedSection}>
          <Text style={ Styles.Styles.combinedSectionHeader }>{lang.logIn.passwordField}</Text>
          <TextInput
            placeholder="Aa"
            secureTextEntry={true}
            onChangeText={(loginPassword) => setLoginPassword(loginPassword)}
            value={loginPassword}
            style={Styles.Styles.inputBox}
            placeholderTextColor='#0008'
            />
        </View>
          
          <SimpleButton title={lang.logIn.submit} onPress={logIn}/>
      </View>
      
      <View style={Styles.Styles.oneThirdSection}>
        <View>
          <TouchableOpacity onPress={() => navigation.replace('Forgot Password')}>
            <Text style={ Styles.Styles.navigationLink }>{lang.logIn.forgotPassword}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Sign Up')}>
            <Text style={ Styles.Styles.navigationLink }>{lang.logIn.createAccount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={skipLogIn}>
            <Text style={ Styles.Styles.navigationLink }>{lang.logIn.skipLoggingIn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default LogIn;