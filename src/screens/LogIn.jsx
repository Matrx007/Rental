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

import SimpleButton from '../components/SimpleButton.jsx';

// This is a navigators's screen
const LogIn = ({ navigation }) => {
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [user, setUser] = Global.useUser();
  
  function logIn() {
    // TODO: firebase.login(callback: navigation.replace(..))
    navigation.replace('Properties');
  }
  
  function skipLogIn() {
    // TODO: firebase.asAnonymous(callback: navigation.replace(..))
    console.log(user);
    setUser(true);
    console.log(user);
  }
  
  const rootViewStyle = {
    
  };

  return (
    <View style={[ Styles.Styles.fillScreen, { backgroundColor: '#0000' } ]}>
      
      <View style={ Styles.Styles.oneThirdSection }>
        <Text style={ Styles.Styles.pageTitle }>Welcome back!</Text>
        <Text style={ Styles.Styles.pageSubTitle }>Log in</Text>
      </View>
      
      <View style={[ Styles.Styles.oneThirdSection, {  paddingHorizontal: 32 } ]}>
        <View style={[ Styles.Styles.combinedSection, { marginBottom: 8 } ]}>
          <Text style={ Styles.Styles.combinedSectionHeader }>E-MAIL</Text>
          <TextInput
            placeholder="Aa"
            onChangeText={(loginEmail) => setLoginEmail(loginEmail)}
            value={loginEmail}
            style={Styles.Styles.inputBox}
            placeholderTextColor='#0008'
            />
        </View>
        
        <View style={Styles.Styles.combinedSection}>
          <Text style={ Styles.Styles.combinedSectionHeader }>PASSWORD</Text>
          <TextInput
            placeholder="Aa"
            secureTextEntry={true}
            onChangeText={(loginPassword) => setLoginPassword(loginPassword)}
            value={loginPassword}
            style={Styles.Styles.inputBox}
            placeholderTextColor='#0008'
            />
        </View>
          
          <SimpleButton title="Log in" onPress={logIn}/>
      </View>
      
      <View style={Styles.Styles.oneThirdSection}>
        <View>
          <TouchableOpacity onPress={() => navigation.replace('Forgot Password')}>
            <Text style={ Styles.Styles.navigationLink }>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Sign Up')}>
            <Text style={ Styles.Styles.navigationLink }>Create an account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={skipLogIn}>
            <Text style={ Styles.Styles.navigationLink }>Skip logging in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default LogIn;